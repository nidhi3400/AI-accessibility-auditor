export default function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      <h3>{issue.issue}</h3>

      <p>
        <strong>WCAG:</strong> {issue.criterion}
      </p>

      <p>
        <strong>Severity:</strong> {issue.severity}
      </p>

      <p>
        <strong>Recommendation:</strong>
        {" "}
        {issue.recommendation}
      </p>
    </div>
  );
}