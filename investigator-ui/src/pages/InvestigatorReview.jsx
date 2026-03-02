import { useEffect, useState } from "react";
import { getClaim } from "../api/claims";


import ClaimContext from "../components/ClaimContext";
import ApplicationPanel from "../components/ApplicationPanel";
import DocumentsPanel from "../components/DocumentsPanel";
import AnnotationsPanel from "../components/AnnotationsPanel";
import RiskSummary from "../components/RiskSummary";
import RiskBreakdown from "../components/RiskBreakdown";
import ActionPanel from "../components/ActionPanel";
import AuditTrail from "../components/AuditTrail";

export default function InvestigatorReview() {
 const [claim, setClaim] = useState(null);
 const CLAIM_ID = "KR-2026-10903";
 const [activeTab, setActiveTab] = useState("application");

 useEffect(() => {
  getClaim(CLAIM_ID)
    .then((data) => {
      setClaim(data);
    })
    .catch((error) => {
      console.error("Failed to load claim:", error);
    });
}, []);

  return (
    <div className="page">
      <div className="header">Kritikos AI — Claim Investigator Review</div>

      <div className="container">
        <ClaimContext />

        <div className="grid">
          {/* LEFT PANEL */}
          <div>
            <div className="tabs">
              <div
                className={`tab ${activeTab === "application" ? "active" : ""}`}
                onClick={() => setActiveTab("application")}
              >
                Application
              </div>
              <div
                className={`tab ${activeTab === "documents" ? "active" : ""}`}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </div>
              <div
                className={`tab ${activeTab === "annotations" ? "active" : ""}`}
                onClick={() => setActiveTab("annotations")}
              >
                Annotations
              </div>
            </div>

            {activeTab === "application" && <ApplicationPanel />}
            {activeTab === "documents" && <DocumentsPanel />}
            {activeTab === "annotations" && <AnnotationsPanel />}
          </div>

          {/* RIGHT PANEL */}
          <div>
            <RiskSummary />
            <RiskBreakdown />
            <ActionPanel />
            <AuditTrail />
          </div>
        </div>
      </div>
    </div>
  );
}