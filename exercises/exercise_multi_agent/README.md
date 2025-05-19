# Exercise Multi-Agent

Since we can't use our own function declarations along with the Google provided tools in the one agent, let's turn them into multiple agents that are provided as tools.

In `tools.js`, add new functions, with descriptions, that use `genAI.models.generateContent` with the Google provided tools. Export these tools as part of the function declarations and observe that you can now call on these agents as part of your main co-ordinating agent.
