import { genAI } from "./bot.js";

export async function embed(text) {
  const response = await genAI.models.embedContent({
    model: "gemini-embedding-exp-03-07",
    contents: text,
  });
  console.log(response.embeddings.values);
  return response.embeddings[0].values;
}
