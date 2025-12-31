
import { GoogleGenAI } from "@google/genai";

/**
 * Service to interact with Gemini for financial advice.
 * Follows @google/genai coding guidelines.
 */
export const getFinancialAdvice = async (userPrompt: string) => {
  // Use process.env.API_KEY directly when initializing the GoogleGenAI instance.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    // Use ai.models.generateContent directly with model name and prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a world-class financial strategist for MTG GROUP. Provide professional, analytical, and concise financial advice. Focus on ROI, risk mitigation, and capital structure. Keep answers professional and structured.",
        temperature: 0.7,
      },
    });

    // Access the generated text content via the .text property.
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};