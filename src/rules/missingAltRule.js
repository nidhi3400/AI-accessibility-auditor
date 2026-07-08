export function missingAltRule(document) {
  const issues = [];

  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt")) {
      issues.push({
        criterion: "1.1.1",
        level: "A",
        severity: "high",
        issue: "Image missing alt text",
        affectedUsers: [
          "Blind users",
          "Screen reader users"
        ],
        recommendation:
          "Provide meaningful alt text."
      });
    }
  });

  return issues;
}