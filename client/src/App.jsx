import { useState } from "react";

import ScoreCard from "./components/ScoreCard";
import ComplianceCard from "./components/ComplianceCard";
import IssueCard from "./components/IssueCard";
import IssueModal from "./components/IssueModal";

import "./App.css";

function App() {
  const [html, setHtml] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleAudit = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/audit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            html,
          }),
        }
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to audit HTML");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        AI Accessibility Auditor
      </h1>

      <div className="dashboard">
        <div className="left-panel">
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste HTML here..."
          />

          <button
            onClick={handleAudit}
            disabled={loading || !html.trim()}
          >
            {loading
              ? "Auditing Accessibility..."
              : "Audit HTML"}
          </button>
        </div>

        <div className="right-panel">
          {!result ? (
            <div className="empty-state">
              Run an audit to see accessibility
              results
            </div>
          ) : (
            <>
              <div className="results-overview">
                <ScoreCard score={result.score} />

                <ComplianceCard
                  compliance={result.compliance}
                />
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
                        <h3>
                          Accessibility Issues (
                          {result.issues.length})
                        </h3>
                      </div>

                      <div className="issues-list">
                        {result.issues.map(
                          (issue, index) => (
                            <IssueCard
                              key={index}
                              issue={issue}
                              onViewDetails={
                                setSelectedIssue
                              }
                            />
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="issues-header">
                        <h3>
                          Top Issues (2 of{" "}
                          {result.issues.length})
                        </h3>
                      </div>

                      <div className="issues-list">
                        {result.issues
                          .slice(0, 2)
                          .map(
                            (
                              issue,
                              index
                            ) => (
                              <IssueCard
                                key={index}
                                issue={issue}
                                onViewDetails={
                                  setSelectedIssue
                                }
                              />
                            )
                          )}
                      </div>

                      <button
                        className="view-all-btn"
                        onClick={() =>
                          setSelectedIssue({
                            title:
                              "All Issues",
                            issues:
                              result.issues,
                          })
                        }
                      >
                        View All Issues (
                        {
                          result.issues
                            .length
                        }
                        )
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
        onClose={() =>
          setSelectedIssue(null)
        }
      />
    </div>
  );
}

export default App;