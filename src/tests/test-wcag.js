import { auditHtml } from "../audit/auditHtml.js";
import { generateMarkdownReport } from "../reports/markdownReport.js";
import { testCases } from "./wcagTestCases.js";

for (const testCase of testCases) {
  const result = auditHtml(testCase.html);

  console.log(`
=================================
${testCase.name}
=================================
`);

  const report = generateMarkdownReport(result);

  console.log(report);
}