import { useState } from "react";

export default function ActionPanel() {
  const [action, setAction] = useState("");
  const [comment, setComment] = useState("");
  const [escalation, setEscalation] = useState("");

  const submitDecision = () => {
    if (!action) {
      alert("Please select an action.");
      return;
    }

    if (action !== "approve" && !comment.trim()) {
      alert("Comment is required for this action.");
      return;
    }

    alert(
      `Decision submitted:\n\n` +
      `Action: ${action}\n` +
      `Escalation: ${escalation || "None"}\n` +
      `Comment: ${comment || "N/A"}`
    );
  };

  return (
    <div className="card">
      <h3 className="section-title">Investigator Action</h3>

      {/* Primary Actions */}
      <div className="action-buttons">
        <button
          className={`action-btn approve ${action === "approve" ? "active" : ""}`}
          onClick={() => setAction("approve")}
        >
          Approve
        </button>

        <button
          className={`action-btn reject ${action === "reject" ? "active" : ""}`}
          onClick={() => setAction("reject")}
        >
          Reject
        </button>

        <button
          className={`action-btn review ${action === "review" ? "active" : ""}`}
          onClick={() => setAction("review")}
        >
          Override / Review
        </button>
      </div>

      {/* Escalation */}
      <div className="escalation">
        <label>Escalate for Secondary Opinion (optional)</label>
        <select
          value={escalation}
          onChange={(e) => setEscalation(e.target.value)}
        >
          <option value="">None</option>
          <option value="Supervisor">Supervisor Review (SLA: 12 hrs)</option>
          <option value="Medical SME">Medical SME (SLA: 24 hrs)</option>
          <option value="Fraud Team">Fraud Team (SLA: 48 hrs)</option>
        </select>
      </div>

      {/* Comment */}
      <div className="decision-comment">
        <label>Decision Comment</label>
        <textarea
          placeholder="Add justification or observations (required for reject / override)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button className="btn-primary full-width" onClick={submitDecision}>
        Submit Decision
      </button>
    </div>
  );
}