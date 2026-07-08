import { Ollama } from "@langchain/ollama";

const model = new Ollama({
  model: "llama3.2",
  temperature: 0
});

export async function generateRecommendation(
  issue,
  html
) {
  const prompt = buildRecommendationPrompt(
    issue,
    html
  );

  const response =
    await model.invoke(prompt);

  return JSON.parse(response);
}