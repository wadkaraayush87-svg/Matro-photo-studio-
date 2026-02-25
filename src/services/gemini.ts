import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatWithGemini = async (message: string, history: any[] = []) => {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are the AI assistant for Metro Photo Studio, a premium photography studio in Maharashtra. You help users with inquiries about wedding shoots, baby shoots, and other photography services. Be polite, professional, and helpful. If asked about pricing, mention that they can view details on the category pages or book a consultation for ₹9.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateStudioImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: {
      parts: [{ text: `A professional photography studio shot: ${prompt}. High quality, cinematic lighting, premium feel.` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: size,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const getFastResponse = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });
  return response.text;
};
