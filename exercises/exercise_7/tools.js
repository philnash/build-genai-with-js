import { Type } from "@google/genai";
import { search } from "./db.js";

const addFunctionDeclaration = {
  name: "add",
  description: "Add two numbers together. Use this for accurate addition.",
  parameters: {
    type: Type.OBJECT,
    description: "The numbers to add together",
    required: ["a", "b"],
    properties: {
      a: {
        type: Type.NUMBER,
        description: "The first number",
      },
      b: {
        type: Type.NUMBER,
        description: "The second number",
      },
    },
  },
};

function add({ a, b }) {
  return { output: String(a + b) };
}

const dateFunctionDeclaration = {
  name: "date",
  description: "Get the current date and time.",
};

function date() {
  return { output: new Date().toISOString() };
}

const faqSearchDeclaration = {
  name: "faqSearch",
  description: "Search the FAQ database for help with technical products.",
  parameters: {
    type: Type.OBJECT,
    description: "The search query",
    required: ["query"],
    properties: {
      query: {
        type: Type.STRING,
        description: "The search query",
      },
    },
  },
};

async function faqSearch({ query }) {
  const results = await search(query, 5);
  return { output: results.map((doc) => doc.content).join("\n") };
}

const fetchUrlDeclaration = {
  name: "fetchUrl",
  description: "Fetch the content of a URL or browser a website.",
  parameters: {
    type: Type.OBJECT,
    description: "The URL to fetch",
    required: ["url"],
    properties: {
      url: {
        type: Type.STRING,
        description: "The URL to fetch",
      },
    },
  },
};

async function fetchUrl({ url }) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.statusText}`);
  }
  const text = await response.text();
  return { output: text };
}

export const functions = { add, date, faqSearch, fetchUrl };
export const functionDeclarations = [
  addFunctionDeclaration,
  dateFunctionDeclaration,
  faqSearchDeclaration,
  fetchUrlDeclaration,
];
