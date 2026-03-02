export default function RiskSummary() {
  return (
    <div className="card">
      <h3 className="section-title">AI Risk Summary</h3>

      <div className="risk-summary">
        <div className="risk-score-box">
          <div className="risk-score">72</div>
          <div className="risk-label">Risk Index (out of 100)</div>
        </div>

        <div className="risk-text">
          <div>
            <strong>AI Recommendation:</strong>{" "}
            <span className="recommendation">Review Required</span>
          </div>
          <div className="confidence">
            Model Confidence: <strong>82%</strong>
          </div>
        </div>
      </div>

      <div className="ai-note">
        This recommendation is generated using historical claim patterns and
        policy rules. Final decision rests with the investigator.
      </div>
    </div>
  );
}