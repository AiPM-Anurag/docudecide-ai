const BASE_URL = "http://127.0.0.1:8000";

export async function getClaim(claimId) {
  const res = await fetch(`${BASE_URL}/claims/${claimId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch claim");
  }
  return res.json();
}

export async function submitDecision(claimId, payload) {
  const formData = new FormData();
  formData.append("action", payload.action);
  formData.append("override_reason", payload.override_reason || "");

  const res = await fetch(
    `${BASE_URL}/claims/${claimId}/decision`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to submit decision");
  }

  return res.json();
}

export async function getAuditTrail(claimId) {
  const res = await fetch(`${BASE_URL}/claims/${claimId}/audit`);
  if (!res.ok) {
    throw new Error("Failed to fetch audit trail");
  }
  return res.json();
}