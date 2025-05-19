import { DataAPIClient } from "@datastax/astra-db-ts";
import { env } from "node:process";
import { embed } from "./embedding.js";
import { genAI } from "./bot.js";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_COLLECTION_NAME,
} = env;

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT);
export const collection = db.collection(ASTRA_DB_COLLECTION_NAME);

export async function search(query, limit = 5) {
  const embedding = await embed(query);
  const cursor = collection.find(
    {},
    {
      sort: {
        $vector: embedding,
      },
      limit,
    }
  );
  const context = await cursor.toArray();
  return context;
}

export async function searchWithHyde(query, limit = 5) {
  const generatedQuery = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Given a question, generate a paragraph of text that answers the question.
Question: ${query}
Paragraph:`,
  });

  const embedding = await embed(generatedQuery.text);
  const cursor = collection.find(
    {},
    {
      sort: {
        $vector: embedding,
      },
      limit,
    }
  );
  const context = await cursor.toArray();
  return context;
}
