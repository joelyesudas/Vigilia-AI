import { GoogleGenerativeAI } from "@google/generative-ai";

export const askGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("Gemini key loaded:", apiKey ? "YES" : "NO");

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not loaded from .env");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};