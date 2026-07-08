export function issueTemplate(issue, index) {
  return `
### ${index}. ${issue.issue}

- WCAG Criterion: ${issue.criterion}
- Level: ${issue.level}
- Severity: ${issue.severity}

#### Affected Users

${issue.affectedUsers.map(user => `- ${user}`).join("\n")}

#### Recommendation

${issue.recommendation}
`;
}