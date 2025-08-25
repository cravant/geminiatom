import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini", // recommended model
      input: [
        {
          role: "system",
          content: "You are Gemini Atom, a friendly high school tutor for grades 9–12. Explain clearly and casually."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const reply = response.output[0]?.content[0]?.text || "Sorry, no response";

    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to contact OpenAI" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
