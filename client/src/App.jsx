import { useState } from "react";
import ScoreCard from "./components/ScoreCard";
import ComplianceCard from "./components/ComplianceCard";
import IssueCard from "./components/IssueCard";

function App() {
  const [html, setHtml] = useState("");
  const [result, setResult] = useState(null);

  const handleAudit = async () => {
  const response = await fetch("http://localhost:3001/audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      html,
    }),
  });

  const data = await response.json();

  setResult(data);
};

  return (
    <div className="container">
    <h1>AI Accessibility Auditor</h1>

    <textarea 
      value={html}
      onChange={(e) => setHtml(e.target.value)}
      placeholder="Paste HTML here..." />

    <button onClick={handleAudit}>Audit HTML</button>

    {result && (
      <>
        <ScoreCard score={result.score} />
        <ComplianceCard compliance={result.compliance} />
        <h2>Issues Found</h2>
        {result.issues.map((issue, index) => (
          <IssueCard
            key={index}
            issue={issue}
          />
        ))}
      </>
    )}
  </div>
  );
}

export default App;