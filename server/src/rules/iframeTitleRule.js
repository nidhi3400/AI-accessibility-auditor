export function iframeTitleRule(document) {
  const issues = [];

  document
    .querySelectorAll("iframe")
    .forEach((iframe) => {
      const title =
        iframe.getAttribute("title");

      if (
        !title ||
        !title.trim()
      ) {
        issues.push({
          criterion: "4.1.2",
          level: "A",
          severity: "high",
          issue:
            "Iframe missing title",
          affectedUsers: [
            "Screen reader users",
          ],
          recommendation:
            "Provide a descriptive title attribute for the iframe.",
        });
      }
    });

  return issues;
}