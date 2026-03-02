export default function ApplicationPanel() {
  return (
    <div className="card">
      <h3 className="section-title">Claim Application</h3>

      {/* Patient Details */}
      <div className="section">
        <h4>Patient Details</h4>
        <div className="row">
          <div><strong>Name:</strong> Ramesh Kumar</div>
          <div><strong>Age / Gender:</strong> 54 / Male</div>
        </div>
        <div className="row">
          <div><strong>City:</strong> Bengaluru</div>
          <div><strong>Policy Holder:</strong> Self</div>
        </div>
      </div>

      {/* Hospital Details */}
      <div className="section">
        <h4>Hospital Details</h4>
        <div className="row">
          <div><strong>Hospital Name:</strong> Apollo Hospitals</div>
          <div><strong>Hospital Type:</strong> Non-Network</div>
        </div>
        <div className="row">
          <div><strong>City:</strong> Bengaluru</div>
          <div><strong>Hospital Tier:</strong> Tier 1</div>
        </div>
      </div>

      {/* Treatment Details */}
      <div className="section">
        <h4>Treatment Details</h4>
        <div className="row">
          <div><strong>Diagnosis:</strong> Acute Appendicitis</div>
          <div><strong>Procedure:</strong> Laparoscopic Appendectomy</div>
        </div>
        <div className="row">
          <div><strong>Admission Type:</strong> Emergency</div>
          <div><strong>Length of Stay:</strong> 4 days</div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="section">
        <h4>Financial Summary</h4>
        <div className="row">
          <div><strong>Total Claimed:</strong> ₹1,24,000</div>
          <div><strong>Room Charges:</strong> ₹42,000</div>
        </div>
        <div className="row">
          <div><strong>Surgery:</strong> ₹55,000</div>
          <div><strong>Medicines & Others:</strong> ₹27,000</div>
        </div>
      </div>
    </div>
  );
}