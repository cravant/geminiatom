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

// your saved Prompt ID from OpenAI
const PROMPT_ID = "pmpt_68999b956ec481948127e9babd560fd50303dbebb0399376";

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano", // or whichever new model you’re using
      input: [
        {
          role: "user",
          content: message,
        },
      ],
      prompt: {
        id: PROMPT_ID,
        version: "3",
      },
    });

    // Extract text from the new API structure
    const reply = response.output[0]?.content[0]?.text || "Sorry, no response.";

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
