import { useState } from "react";

import ScoreCard from "./components/ScoreCard";
import ComplianceCard from "./components/ComplianceCard";
import IssueCard from "./components/IssueCard";
import IssueModal from "./components/IssueModal";

import "./App.css";

function App() {
  const [auditType, setAuditType] = useState("html");

  const [html, setHtml] = useState("");
  const [url, setUrl] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleAudit = async () => {
    try {
      setLoading(true);

      const endpoint =
        auditType === "html"
          ? "http://localhost:3001/audit"
          : "http://localhost:3001/audit-url";

      const payload = auditType === "html" ? { html } : { url };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to run audit");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading || (auditType === "html" ? !html.trim() : !url.trim());

  return (
    <div className="container">
      <h1 className="title">AI Accessibility Auditor</h1>

      <div className="dashboard">
        <div className="left-panel">
          <div className="audit-type-toggle">
            <button
              className={auditType === "html" ? "active" : ""}
              onClick={() => setAuditType("html")}
            >
              HTML
            </button>

            <button
              className={auditType === "url" ? "active" : ""}
              onClick={() => setAuditType("url")}
            >
              Website URL
            </button>
          </div>

          {auditType === "html" ? (
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste HTML here..."
            />
          ) : (
            <div className="url-input-wrapper">
              <input
                type="url"
                className="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          )}

          <button onClick={handleAudit} disabled={isDisabled}>
            {loading
              ? "Auditing Accessibility..."
              : auditType === "html"
                ? "Audit HTML"
                : "Audit Website"}
          </button>
        </div>

        <div className="right-panel">
          {!result ? (
            <div className="empty-state">
              Run an audit to see accessibility results
            </div>
          ) : (
            <>
              <div className="results-overview">
                <ScoreCard score={result.score} />

                <ComplianceCard compliance={result.compliance} />
              </div>

              {result.issues.length === 0 ? (
                <div className="empty-state">
                  🎉 No accessibility issues found
                </div>
              ) : (
                <div className="issues-section">
                  {result.issues.length <= 3 ? (
                    <>
                      <div className="issues-header">
                        <h3>Accessibility Issues ({result.issues.length})</h3>
                      </div>

                      <div className="issues-list">
                        {result.issues.map((issue, index) => (
                          <IssueCard
                            key={index}
                            issue={issue}
                            onViewDetails={setSelectedIssue}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="issues-header">
                        <h3>Top Issues (2 of {result.issues.length})</h3>
                      </div>

                      <div className="issues-list">
                        {result.issues.slice(0, 2).map((issue, index) => (
                          <IssueCard
                            key={index}
                            issue={issue}
                            onViewDetails={setSelectedIssue}
                          />
                        ))}
                      </div>

                      <button
                        className="view-all-btn"
                        onClick={() =>
                          setSelectedIssue({
                            title: "All Issues",
                            issues: result.issues,
                          })
                        }
                      >
                        View All Issues ({result.issues.length})
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <IssueModal
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </div>
  );
}

export default App;
