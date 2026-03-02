import { useState } from "react";

export default function RiskBreakdown() {
  const [openIndex, setOpenIndex] = useState(null);

  const factors = [
    {
      name: "Hospital Type",
      score: 72,
      explanation:
        "The hospital is a non-network private facility. Historical data shows higher variance in billing patterns compared to network hospitals."
    },
    {
      name: "Treatment Type",
      score: 18,
      explanation:
        "The procedure is common and aligns with standard treatment protocols for the given diagnosis."
    },
    {
      name: "Length of Stay",
      score: 65,
      explanation:
        "Length of stay is longer than the benchmark for similar cases, which may require additional review."
    },
    {
      name: "Billing Pattern",
      score: 80,
      explanation:
        "Room rent and surgical charges are above the median observed for similar procedures in the same city."
    },
    {
      name: "Geography",
      score: 22,
      explanation:
        "Claim originates from a low-risk geography with stable historical claim behavior."
    }
  ];

  return (
    <div className="card">
      <h3 className="section-title">Risk Breakdown (Explainability)</h3>

      {factors.map((factor, index) => (
        <div key={index} className="risk-factor">
          <div
            className="risk-factor-header"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <div>
              <strong>{factor.name}</strong>
            </div>
            <div className="risk-meta">
              <span className="risk-chip">{factor.score}</span>
              <span className="why-link">Why?</span>
            </div>
          </div>

          {openIndex === index && (
            <div className="risk-explanation">
              {factor.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}