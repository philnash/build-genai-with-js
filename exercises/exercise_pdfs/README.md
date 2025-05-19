# Exercise PDFs

## Different extractions

Create a file called `load_pdf.js` in the `src` directory.

Load a PDF file from an external URL, here are a couple of examples:

- https://css4.pub/2017/newsletter/drylab.pdf
- https://www.princexml.com/howcome/2016/samples/magic6/magic.pdf

Fetch the PDF and return an arrayBuffer.

```js
const response = await fetch(pdfUrl).then((res) => res.arrayBuffer());
```

### Using pdf-parse

Import the `pdf` function from `@bingsjs/pdf-parse`. `await` the `pdf` function with the arrayBuffer, which will return an object with details about the PDF file. You can log out the `text` property to see what was extracted.

The documentation for pdf-parse can be found here: https://gitlab.com/bingtimren/pdf-parse

### Using Gemini

This takes a bit more work, but hopefully you will see the difference.

Set up the prompt with an array of contents that you will send to the model. The contents array should include:

- an object with a `text` property containing the prompt for the model. Start with something simple, like asking it to extract the text from the file
- an object with an `inlineData` property, which is an object that looks like this:
  ```
  inlineData: {
    mimeType: "application/pdf",
    data: Buffer.from(pdfResponse).toString("base64"),
  }
  ```
  This sets up the PDF data to be sent as base64 encoded content.

Import the `genAI` object you've used before and use the `models.generateContent` method to pass the `contents` array and the model ("gemini-2.0-flash").

There is documentation on this here: https://ai.google.dev/gemini-api/docs/document-processing?lang=node

Observe the difference in quality between pdf-parse and using the model.

Experiment with the prompt to see if you can create better output, descriptions of images or structured data. Use the PDF uploading and understanding to ask questions of PDFs as well as simply extracting text.
