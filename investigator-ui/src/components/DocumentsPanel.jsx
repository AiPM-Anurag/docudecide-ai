import { useState } from "react";

export default function DocumentsPanel() {
  const [docs, setDocs] = useState([
    { name: "Discharge Summary", verified: false },
    { name: "Itemized Bill", verified: false },
    { name: "Diagnosis Report", verified: false }
  ]);

  const verifyDoc = (index) => {
    const updated = [...docs];
    updated[index].verified = true;
    setDocs(updated);
  };

  return (
    <div className="card">
      <h3 className="section-title">Uploaded Documents</h3>

      {docs.map((doc, index) => (
        <div key={index} className="doc-row">
          <div>
            <strong>{doc.name}</strong>
            <span
              className={
                doc.verified ? "status verified" : "status pending"
              }
            >
              {doc.verified ? "Verified" : "Pending"}
            </span>
          </div>

          <div className="doc-actions">
            <button className="btn-secondary">Preview</button>
            {!doc.verified && (
              <button
                className="btn-primary"
                onClick={() => verifyDoc(index)}
              >
                Mark Verified
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}