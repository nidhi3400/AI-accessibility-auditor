import OpenAI from "openai";

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
});

async function run() {

    // <img src="logo.png">
    // <img src="logo.png" alt="Company Logo">
    // <button></button>
    
    const html = `
        <img src="logo.png" alt="Company Logo">
    `;

    const systemPrompt = `
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

        {
        "score": number,
        "issues": [
            {
            "severity": "low|medium|high",
            "issue": "string"
            }
        ],
        "recommendations": ["string"]
        }
    `;
    
    const response = await client.chat.completions.create({
        model: "llama3.2",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: html
            }
        ]
    });

    const content = response.choices[0].message.content;

    try {
    const result = JSON.parse(content);

    console.log("Accessibility Score:", result.score);
    console.log("Issues:", result.issues);
    } catch (err) {
    console.error("Invalid JSON received");
    }
}

run();