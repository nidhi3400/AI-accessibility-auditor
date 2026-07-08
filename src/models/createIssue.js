export function createIssue({
  criterion,
  level,
  severity,
  issue,
  affectedUsers,
  recommendation,
}) {
  return {
    criterion,
    level,
    severity,
    issue,
    affectedUsers,
    recommendation,
  };
}