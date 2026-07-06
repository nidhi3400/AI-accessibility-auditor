import { PromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";

/*
Learnings so far:

1. PromptTemplate creates reusable prompts.
2. Ollama provides the local LLM.
3. model.invoke() sends prompts to the model.
4. LLMs can hallucinate.
5. "Return JSON" does not guarantee valid JSON.
6. Regex extraction is a temporary workaround.
*/

const testCases = [
  {
    name: "Missing Alt",
    html: '<img src="logo.png">',
  },
  {
    name: "Proper Image",
    html: '<img src="logo.png" alt="Company Logo">',
  },
  {
    name: "Empty Button",
    html: '<button></button>',
  },
  {
    name: "Input Without Label",
    html: '<input type="email">',
  },
  {
    name: "Label Not Connected",
    html: `
      <label>Email</label>
      <input type="email">
    `,
  },
  {
    name: "Proper Form",
    html: `
      <label for="email">Email</label>
      <input id="email" type="email">

      <button>Submit</button>
    `,
  },
  {
    name: "Multiple Issues",
    html: `
      <img src="banner.jpg">
      <button></button>
      <input type="text">
    `,
  },
];

const model = new Ollama({
    model: "llama3.2",
    temperature: 0,
});

const promptTemplate = PromptTemplate.fromTemplate(`
You are an expert WCAG accessibility auditor.

Analyze the provided HTML.

Rules:

1. Accessibility score must be between 0 and 100.
2. Never return null.
3. Severity must be one of:
   - low
   - medium
   - high
4. If issues exist, score cannot be above 90.
5. Empty buttons are high severity.
6. Missing alt attributes are high severity.
7. Inputs without associated labels are high severity.

Return ONLY valid JSON.

Schema:

{{
  "score": number,
  "issues": [
    {{
      "severity": "low|medium|high",
      "issue": "string"
    }}
  ],
  "recommendations": ["string"]
}}

HTML: {html}
`);

async function run() {
  try {
    for (const testCase of testCases) {
      console.log(`\n\n===== ${testCase.name} =====\n`);

      const finalPrompt = await promptTemplate.format({
        html: testCase.html,
      });

      const response = await model.invoke(finalPrompt);

      console.log("\n===== RAW RESPONSE =====\n");
      console.log(response);

      try {
        const start = response.indexOf("{");
        const end = response.lastIndexOf("}");

        if (start === -1 || end === -1) {
          throw new Error("No JSON found");
        }

        const parsed = JSON.parse(
          response.slice(start, end + 1)
        );

        console.log("\n===== PARSED OUTPUT =====\n");

        console.log("Score:", parsed.score);

        console.log("\nIssues:");
        console.table(parsed.issues);

        console.log("\nRecommendations:");
        console.table(parsed.recommendations);
      } catch (err) {
        console.log("\n===== JSON PARSE FAILED =====\n");
        console.log(err.message);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

run();