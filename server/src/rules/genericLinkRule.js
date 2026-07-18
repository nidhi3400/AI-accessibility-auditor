export function genericLinkRule(
  document
) {
  const issues = [];

  const genericTexts = [
    "click here",
    "read more",
    "learn more",
    "more",
    "link",
  ];

  document
    .querySelectorAll("a")
    .forEach((link) => {
      const text =
        link.textContent
          ?.trim()
          .toLowerCase() || "";

      if (
        genericTexts.includes(text)
      ) {
        issues.push({
          criterion: "2.4.4",
          level: "A",
          severity: "medium",
          issue:
            "Generic link text",
          affectedUsers: [
            "Screen reader users",
          ],
          recommendation:
            "Use descriptive link text that clearly explains the destination or action.",
        });
      }
    });

  return issues;
}