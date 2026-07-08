import { createIssue } from "../models/createIssue.js";

export function emptyButtonRule(document) {
  const issues = [];

  document.querySelectorAll("button").forEach((button) => {
    if (button.textContent.trim() === "") {
      issues.push({
        criterion: "4.1.2",
        level: "A",
        severity: "high",
        issue: "Button has no accessible name",
        affectedUsers: [
          "Blind users",
          "Keyboard users"
        ],
        recommendation:
          "Add visible text or aria-label."
      });
    }
  });

  return issues;
}