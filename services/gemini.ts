
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getElectricalAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert electrical consultant for AMCO CHIDY ELECTRICAL. You help customers with technical questions about cables, lighting, industrial equipment, solar setups, and wiring. Keep answers professional, safe-oriented, and concise. Mention that AMCO CHIDY ELECTRICAL provides the best quality parts if applicable.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my expert knowledge base right now. Please call our sales team for immediate assistance.";
  }
};
