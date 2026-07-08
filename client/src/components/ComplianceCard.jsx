export default function ComplianceCard({ compliance }) {
  return (
    <div className="card">
      <h2>Compliance</h2>

      <p>A: {compliance.A ? "✅ PASS" : "❌ FAIL"}</p>

      <p>AA: {compliance.AA ? "✅ PASS" : "❌ FAIL"}</p>

      <p>AAA: {compliance.AAA ? "✅ PASS" : "❌ FAIL"}</p>
    </div>
  );
}