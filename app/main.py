from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, List
import shutil
import os
import uuid
import tempfile

from app.extractor import extract_text_from_pdf, extract_structured_data
from app.scoring import calculate_risk_score, load_config
from app.database import SessionLocal, Decision, init_db
from sqlalchemy.exc import IntegrityError

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# INITIALIZE DATABASE
# --------------------------------------------------
init_db()

# --------------------------------------------------
# CUSTOMER CLAIM SUBMISSION (MAIN ENTRY POINT)
# --------------------------------------------------
@app.post("/submit-claim/")
async def submit_claim(
    role: Annotated[str, Form()],
    policy_number: Annotated[str, Form()],
    files: Annotated[List[UploadFile], File()]
):
    aggregated_features = {}

    # Process uploaded documents
    for file in files:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            file_path = tmp_file.name
            shutil.copyfileobj(file.file, tmp_file)

        try:
            text = extract_text_from_pdf(file_path)
            features = extract_structured_data(text)

            for key, value in features.items():
                if isinstance(value, (int, float)):
                    aggregated_features[key] = aggregated_features.get(key, 0) + value
                else:
                    aggregated_features[key] = value
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)

    # ------------------------------
    # AI RISK SCORING
    # ------------------------------
    score, explanations = calculate_risk_score(aggregated_features)

    config = load_config()
    thresholds = config["decision_thresholds"]

    if score < thresholds["auto_approve"]:
        decision = "AUTO_APPROVE"
        status = "AI_APPROVED"
    elif score < thresholds["manual_review"]:
        decision = "MANUAL_REVIEW"
        status = "UNDERWRITER_REVIEW"
    else:
        decision = "REJECT"
        status = "AI_REJECTED"

    ai_confidence = round(1 - score, 2)

    # ------------------------------
    # STORE IN DATABASE
    # ------------------------------
    db = SessionLocal()
    try:
        reference_id = None
        for _ in range(5):
            reference_id = f"KR-{uuid.uuid4().hex[:8].upper()}"
            record = Decision(
                reference_id=reference_id,
                policy_number=policy_number,
                role=role,
                risk_score=score,
                risk_explanation="\n".join(explanations),
                status=status
            )
            db.add(record)
            try:
                db.commit()
                db.refresh(record)
                break
            except IntegrityError:
                db.rollback()
                continue
        else:
            raise HTTPException(status_code=500, detail="Could not generate unique reference ID")
    finally:
        db.close()

    return {
        "reference_id": reference_id,
        "role": role,
        "policy_number": policy_number,
        "documents_uploaded": len(files),
        "ai_confidence": ai_confidence,
        "status": status,
        "decision": decision,
        "explanations": explanations,
        "next_steps": [
            "AI Review (Approx 5 minutes)",
            "Underwriter Review (Within 24 hours if required)",
            "Final Decision (Within 48 hours)"
        ]
    }

# --------------------------------------------------
# INVESTIGATOR READ API
# --------------------------------------------------
@app.get("/claims/{reference_id}")
def get_claim(reference_id: str):
    db = SessionLocal()
    try:
        claim = (
            db.query(Decision)
            .filter(Decision.reference_id == reference_id)
            .first()
        )

        if not claim:
            raise HTTPException(status_code=404, detail="Claim not found")

        return {
            "reference_id": claim.reference_id,
            "role": claim.role,
            "policy_number": claim.policy_number,
            "risk_score": claim.risk_score,
            "risk_explanation": claim.risk_explanation,
            "status": claim.status,
        }
    finally:
        db.close()

# --------------------------------------------------
# INVESTIGATOR DECISION API
# --------------------------------------------------
@app.post("/claims/{reference_id}/decision")
def submit_decision(
    reference_id: str,
    action: Annotated[str, Form(...)],
    comment: Annotated[str, Form()] = "",
    escalation: Annotated[str, Form()] = ""
):
    db = SessionLocal()
    try:
        claim = (
            db.query(Decision)
            .filter(Decision.reference_id == reference_id)
            .first()
        )

        if not claim:
            raise HTTPException(status_code=404, detail="Claim not found")

        claim.status = action
        claim.investigator_comment = comment
        claim.escalation = escalation

        db.commit()
        db.refresh(claim)

        return {
            "reference_id": claim.reference_id,
            "status": claim.status,
            "message": "Decision recorded successfully"
        }
    finally:
        db.close()
