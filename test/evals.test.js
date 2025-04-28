import { describe, test } from "node:test";
import { assertMatchesLLMRubric } from "./assertions/promptfoo.js";

describe("the LLM", () => {
  test("should return similar embeddings for similar inputs", async () => {
    const rubric = "Should be polite and concise.";
    const output = "Thank you.";

    await assertMatchesLLMRubric(rubric, output);
  });
});
