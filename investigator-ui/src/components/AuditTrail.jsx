export default function AuditTrail() {
  const events = [
    {
      time: "10:43 AM",
      actor: "System",
      action: "Claim submitted and documents parsed"
    },
    {
      time: "10:44 AM",
      actor: "AI Engine",
      action: "Risk score generated (72 / 100)"
    },
    {
      time: "10:46 AM",
      actor: "Investigator",
      action: "Reviewed claim application"
    },
    {
      time: "10:47 AM",
      actor: "Investigator",
      action: "Verified Discharge Summary document"
    },
    {
      time: "10:48 AM",
      actor: "Investigator",
      action: "Added annotation: Billing appears higher than average"
    }
  ];

  return (
    <div className="card">
      <h3 className="section-title">Audit Trail</h3>

      <div className="audit-list">
        {events.map((event, index) => (
          <div key={index} className="audit-row">
            <div className="audit-time">{event.time}</div>
            <div className="audit-details">
              <strong>{event.actor}</strong>
              <div className="audit-action">{event.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}