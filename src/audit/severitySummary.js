export function getSeveritySummary(issues) {
  return {
    high: issues.filter(i => i.severity === "high").length,
    medium: issues.filter(i => i.severity === "medium").length,
    low: issues.filter(i => i.severity === "low").length,
  };
}