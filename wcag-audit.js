import { JSDOM } from "jsdom";

function calculateCompliance(violations) {
  const levels = violations.map((v) => v.level);

  const failA = levels.includes("A");
  const failAA = levels.includes("AA");
  const failAAA = levels.includes("AAA");

  return {
    A: !failA,
    AA: !failA && !failAA,
    AAA: !failA && !failAA && !failAAA,
  };
}

function calculateScore(violations) {
  let score = 100;

  const weights = {
    high: 20,
    medium: 10,
    low: 5,
  };

  violations.forEach((violation) => {
    score -= weights[violation.severity] || 0;
  });

  return Math.max(score, 0);
}

export function auditHtml(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const violations = [];

  // =========================
  // WCAG 1.1.1 - Missing Alt
  // =========================

  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
      violations.push({
        criterion: "1.1.1",
        level: "A",
        severity: "high",
        issue: "Image missing alt text",
        affectedUsers: [
          "Blind users",
          "Screen reader users",
        ],
        impact:
          "Assistive technologies cannot describe the image content.",
        fix:
          "Add meaningful alt text describing the image.",
      });
    }
  });

  // =========================
  // WCAG 4.1.2 - Empty Button
  // =========================

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    const text = button.textContent.trim();

    if (!text) {
      violations.push({
        criterion: "4.1.2",
        level: "A",
        severity: "high",
        issue: "Empty button",
        affectedUsers: [
          "Screen reader users",
          "Keyboard-only users",
        ],
        impact:
          "Users cannot understand the purpose of the button.",
        fix:
          "Provide visible button text or an aria-label.",
      });
    }
  });

  // =========================
  // WCAG 3.3.2 - Missing Label
  // =========================

  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    const id = input.getAttribute("id");

    let hasAssociatedLabel = false;

    if (id) {
      const label = document.querySelector(
        `label[for="${id}"]`
      );

      hasAssociatedLabel = !!label;
    }

    if (!hasAssociatedLabel) {
      violations.push({
        criterion: "3.3.2",
        level: "A",
        severity: "high",
        issue: "Input without associated label",
        affectedUsers: [
          "Blind users",
          "Screen reader users",
          "Users with cognitive disabilities",
        ],
        impact:
          "Users may not know what information is expected.",
        fix:
          "Associate the input with a label using for/id attributes.",
      });
    }
  });

  return {
    score: calculateScore(violations),

    compliance: {
      ...calculateCompliance(violations),

      significance: {
        A: "Basic accessibility requirements. Failure indicates critical accessibility barriers.",
        AA: "Industry standard and commonly required for legal compliance.",
        AAA: "Highest accessibility standard providing the best accessibility experience.",
      },
    },

    totalIssues: violations.length,

    issues: violations,
  };
}