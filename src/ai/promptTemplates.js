export function buildRecommendationPrompt(issue, html) {
  return `
You are a WCAG accessibility expert.

Issue:
${issue.issue}

WCAG Criterion:
${issue.criterion}

HTML:
${html}

Return JSON:

{
  "explanation":"",
  "affectedUsers":[],
  "fix":"",
  "fixedHtml":""
}
`;
}