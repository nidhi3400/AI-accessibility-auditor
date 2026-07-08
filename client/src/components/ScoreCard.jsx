export default function ScoreCard({ score }) {
  return (
    <div className="card">
      <h2>Accessibility Score</h2>
      <h1>{score}/100</h1>
    </div>
  );
}