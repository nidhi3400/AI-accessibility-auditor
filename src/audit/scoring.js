export function calculateScore(issues) {
  let score = 100;

  issues.forEach((issue) => {
    switch (issue.severity) {
      case "high":
        score -= 20;
        break;

      case "medium":
        score -= 10;
        break;

      case "low":
        score -= 5;
        break;
    }
  });

  return Math.max(score, 0);
}