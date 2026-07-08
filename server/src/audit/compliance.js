export function calculateCompliance(issues) {
  const hasA = issues.some(
    (issue) => issue.level === "A"
  );

  const hasAA = issues.some(
    (issue) => issue.level === "AA"
  );

  const hasAAA = issues.some(
    (issue) => issue.level === "AAA"
  );

  return {
    A: !hasA,
    AA: !hasA && !hasAA,
    AAA: !hasA && !hasAA && !hasAAA,
  };
}