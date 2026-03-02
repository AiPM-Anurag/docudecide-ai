from pydantic import BaseModel
from typing import List
import uuid
from datetime import datetime

class ClaimSubmission(BaseModel):
    role: str
    policy_number: str
    documents: List[str]

class ClaimResponse(BaseModel):
    reference_id: str
    status: str
    ai_confidence: float
    next_steps: List[str]