export function inputLabelRule(document) {
  const issues = [];

  document.querySelectorAll("input").forEach((input) => {
    const label =
      document.querySelector(
        `label[for="${input.id}"]`
      );

    if (!label) {
      issues.push({
        criterion: "1.3.1",
        level: "A",
        severity: "high",
        issue: "Input missing label",
        affectedUsers: [
          "Blind users",
          "Cognitive disabilities"
        ],
        recommendation:
          "Associate label using for/id."
      });
    }
  });

  return issues;
}