import { genAI } from "./bot.js";
import pdf from "@bingsjs/pdf-parse";

const pdfResponse = await fetch(
  "https://css4.pub/2017/newsletter/drylab.pdf"
).then((res) => res.arrayBuffer());

// Use parse-pdf to extract text
const pdfData = await pdf(pdfResponse);
console.log(pdfData.text);

// User Gemini 2.0 Flash to extract text from PDF
const contents = [
  {
    text: "Extract all of the text from this document formatted as Markdown. The document uses the old style of character, so often what may look like an 'f' is actually an 's' and you should treat it that way.",
  },
  {
    inlineData: {
      mimeType: "application/pdf",
      data: Buffer.from(pdfResponse).toString("base64"),
    },
  },
];

const response = await genAI.models.generateContent({
  model: "gemini-2.0-flash",
  contents: contents,
});

console.log(response.text);
