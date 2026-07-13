import "./ScoreCard.css"

export default function ScoreCard({ score }) {
  const scoreColor =
    score >= 90 ? "#16a34a" : score >= 70 ? "#f59e0b" : "#dc2626";

  return (
    <div className="score-card">
      <h3>Accessibility Score</h3>

      <div
        className="score-number"
        style={{ color: scoreColor }}
      >
        {score}/100
      </div>
    </div>
  );
}