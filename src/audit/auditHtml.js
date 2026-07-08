import { JSDOM } from "jsdom";
import { rules } from "../rules/index.js";
import { calculateScore } from "./scoring.js";
import { calculateCompliance } from "./compliance.js";
import { getSeveritySummary } from "./severitySummary.js";

export function auditHtml(html) {
  const dom = new JSDOM(html);

  const document = dom.window.document;

  const issues = [];

  for (const rule of rules) {
    issues.push(...rule(document));
  }

  const summary = getSeveritySummary(issues);

  return {
    score: calculateScore(issues),
    compliance: calculateCompliance(issues),
    summary,
    totalIssues: issues.length,
    issues,
  };
}