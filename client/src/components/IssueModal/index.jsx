import "./IssueModal.css";

function IssueModal({ issue, onClose }) {
  if (!issue) return null;

  const isAllIssuesView = Array.isArray(issue.issues);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {isAllIssuesView ? (
          <>
            <div className="modal-header">
              <h2 style={{fontWeight: "bold"}}>Accessibility Issues ({issue.issues.length})</h2>
            </div>

            <div className="all-issues-list">
              {issue.issues.map((item, index) => (
                <div key={index} className="modal-issue-card">
                  <h3>{item.title || item.issue || "Accessibility Issue"}</h3>

                  <div className="issue-meta">
                    <div className="meta-card">
                      <span>Severity : </span>
                      <strong>{item.severity}</strong>
                    </div>

                    <div className="meta-card">
                      <span>WCAG</span>
                      <strong>{item.wcagCriterion || "N/A"}</strong>
                    </div>
                  </div>

                  <div className="recommendation-box">
                    <h4>Recommendation</h4>

                    <p>{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2>{issue.title}</h2>
            </div>

            <div className="issue-meta">
              <div className="meta-card">
                <span>Severity : </span>

                <strong>{issue.severity}</strong>
              </div>

              <div className="meta-card">
                <span>WCAG : </span>

                <strong>{issue.wcagCriterion || "N/A"}</strong>
              </div>
            </div>

            {issue.affectedUsers?.length > 0 && (
              <div className="section">
                <h3>Affected Users</h3>

                <ul className="affected-users">
                  {issue.affectedUsers.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="recommendation-box">
              <h3>Recommendation</h3>

              <p>{issue.recommendation}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default IssueModal;
