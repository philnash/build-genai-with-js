import { join } from "node:path";
import { readFile } from "node:fs/promises";

import { collection } from "../../src/db.js";
import { embed } from "../../src/embedding.js";

async function ingest() {
  const path = join(import.meta.dirname, "./faqs.md");
  const file = await readFile(path, { encoding: "utf8" });
  const texts = file.split("\n\n---\n\n");

  const documents = await Promise.all(
    texts.map(async (text) => {
      const embedding = await embed(text);
      return {
        content: text,
        $vector: embedding,
      };
    })
  );

  const result = await collection.insertMany(documents);

  console.log("Ingested documents into the database");
  console.log(result);
}

ingest();
