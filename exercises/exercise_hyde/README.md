# Exercise HyDE

## HyDE

To perform a HyDE style search, instead of embedding the user query you need to generate a potential answer to the query and use that to perform the search against the database. You then use that context to pass to the model to generate a response.

To do so, create a new function in `db.js` that takes the user query and uses the `genAI` object to generate a hypothetical answer to the user query. Turn that hypothetical answer into an embedding and use that to search the database instead.

You can then compare the results of the two search functions with your evaluations.

Check out more on HyDE here:

- https://lantern.dev/blog/hyde
- https://zilliz.com/learn/improve-rag-and-information-retrieval-with-hyde-hypothetical-document-embeddings
