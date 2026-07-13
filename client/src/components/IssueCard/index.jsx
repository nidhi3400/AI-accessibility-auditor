import "./IssueCard.css";

function IssueCard({ issue, onViewDetails }) {
  const title =
    issue.title ||
    issue.issue ||
    issue.type ||
    "Accessibility Issue";

  return (
    <div className="issue-card">
      <div className="issue-info">
        <h3>{title}</h3>

        <div className="issue-meta">
          <span className={`severity severity-${issue.severity}`}>
            {issue.severity?.toUpperCase()}
          </span>

          {issue.wcagCriterion && (
            <span className="wcag-badge">
              {issue.wcagCriterion}
            </span>
          )}
        </div>
      </div>

      <button
        className="details-btn"
        onClick={() => onViewDetails(issue)}
      >
        View Details
      </button>
    </div>
  );
}

export default IssueCard;