import "./ComplianceCard.css";

function ComplianceCard({ compliance }) {
  return (
    <div className="compliance-card">
      <h3>WCAG Compliance</h3>

      <div className="compliance-row">
        <span>A</span>
        <span>{compliance.A ? "✅" : "❌"}</span>
      </div>

      <div className="compliance-row">
        <span>AA</span>
        <span>{compliance.AA ? "✅" : "❌"}</span>
      </div>

      <div className="compliance-row">
        <span>AAA</span>
        <span>{compliance.AAA ? "✅" : "❌"}</span>
      </div>
    </div>
  );
}

export default ComplianceCard;
