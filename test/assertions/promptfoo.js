import { strict as assert } from "node:assert";
import { assertions } from "promptfoo";

const {  matchesLlmRubric } = assertions;

const config = {
  provider: "google:gemini-2.0-flash",
};


export async function assertMatchesLLMRubric(
  rubric,
  output,
) {
  const gradingResult = await matchesLlmRubric(rubric, output, config);
  assert(
    gradingResult.pass,
    `expected
    "${output}"
to pass LLM Rubric
    "${rubric}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}

// Assertion.addAsyncMethod('toMatchFactuality', async function (input, expected, gradingConfig) {
//   const received = this._obj;
//   const gradingResult = await matchesFactuality(input, expected, received, gradingConfig);

//   this.assert(
//     gradingResult.pass,
//     `expected #{this} to match factuality with #{exp}, but it did not. Reason: ${gradingResult.reason}`,
//     `expected #{this} not to match factuality with #{exp}`,
//     expected,
//   );
// });

// Assertion.addAsyncMethod('toMatchClosedQA', async function (input, expected, gradingConfig) {
//   const received = this._obj;
//   const gradingResult = await matchesClosedQa(input, expected, received, gradingConfig);

//   this.assert(
//     gradingResult.pass,
//     `expected #{this} to match ClosedQA with #{exp}, but it did not. Reason: ${gradingResult.reason}`,
//     `expected #{this} not to match ClosedQA with #{exp}`,
//     expected,
//   );
// });
