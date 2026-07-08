import { issueTemplate } from "./templates/issueTemplate.js";

export function generateMarkdownReport(result) {
  return `
# Accessibility Audit Report

## Score

${result.score}/100

## Compliance

- A: ${result.compliance.A ? "PASS" : "FAIL"}
- AA: ${result.compliance.AA ? "PASS" : "FAIL"}
- AAA: ${result.compliance.AAA ? "PASS" : "FAIL"}

## Compliance Significance

### A
Basic accessibility requirements. Failure indicates critical accessibility barriers.

### AA
Industry standard accessibility level and commonly required for legal compliance.

### AAA
Highest accessibility standard providing the best accessibility experience.

## Issue Summary

- High: ${result.summary.high}
- Medium: ${result.summary.medium}
- Low: ${result.summary.low}

## Issues

${
  result.issues.length === 0
    ? "No accessibility issues found 🎉"
    : result.issues
        .map((issue, index) =>
          issueTemplate(issue, index + 1)
        )
        .join("\n")
}
`;
}