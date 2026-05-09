import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * PATHWISE AI ADAPTER
 * This file handles all communication with Google AI Studio.
 * SECURITY: This code runs only on the server. The GEMINI_API_KEY is never exposed to the browser.
 */

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing in environment variables.");
    return null;
  }
  // Explicitly use the stable 'v1' API version to avoid the 404 errors common in 'v1beta'
  return new GoogleGenerativeAI(apiKey, { apiVersion: "v1" });
};

export async function generateAIReport(assessment: any) {
  try {
    const genAI = getGenAI();
    if (!genAI) return "AI Report generation is disabled due to missing configuration.";

    // Fallback logic for model names
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
You are an expert career and academic advisor. A student has completed a career assessment with the following details:
${JSON.stringify(assessment, null, 2)}

Provide a highly personalized, supportive, and professional career report. Address the student directly ("You").
Include:
1. Career DNA Summary
2. Key Strengths & Weaknesses
3. Suggested Career Clusters based on interests and skills
4. Actionable Next Steps

Format the output in clean Markdown.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini Report Error:", error);
    return `Technical error generating report: ${error.message}`;
  }
}

export async function askCareerCoach(history: {role: string, content: string}[], message: string, contextData: any) {
  try {
    const genAI = getGenAI();
    if (!genAI) return "I cannot connect to my AI brain right now. Please check the API configuration.";

    // We use gemini-1.5-flash as the primary model. 
    // If it fails with 404, we catch it and try gemini-pro (Gemini 1.0) as a fallback.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are PathWise AI, an expert academic and career coach for high school students in Egypt.
Be helpful, clear, and practical. Your goal is to help the student choose between the universities and programs they have saved.

CRITICAL: ONLY recommend programs from the student's saved list provided below. Do not make up universities.
Student's Saved Programs: ${JSON.stringify(contextData?.savedPrograms || [])}
Student's Assessment: ${JSON.stringify(contextData?.assessment || "No assessment yet")}

Instructions:
1. Analyze their interests/skills from the assessment.
2. Compare them against the programs in their saved list.
3. Pick the top 1-3 that match best and explain why.`;

    // Ensure history is valid for Gemini (must start with user and alternate)
    const sanitizedHistory = history
      .filter(msg => typeof msg.content === 'string' && msg.content.trim() !== "")
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== 'user') {
      sanitizedHistory.shift();
    }

    const finalHistory = [];
    let lastRole = "";
    for (const msg of sanitizedHistory) {
      if (msg.role !== lastRole) {
        finalHistory.push(msg);
        lastRole = msg.role;
      }
    }

    const chat = model.startChat({ history: finalHistory });
    const finalMessage = `${systemPrompt}\n\nUSER: ${message}`;

    const result = await chat.sendMessage(finalMessage);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    
    // Fallback mechanism: If 1.5 Flash is 404ing, try the ultra-stable Gemini Pro 1.0
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      try {
        const genAI = getGenAI();
        const fallbackModel = genAI!.getGenerativeModel({ model: "gemini-pro" });
        const result = await fallbackModel.generateContent(`${message}\n\n(Context: ${JSON.stringify(contextData)})`);
        return result.response.text();
      } catch (fallbackError: any) {
        return `Deep Connection Error: Even fallback failed. ${fallbackError.message}`;
      }
    }

    return `AI Connection Error: ${error.message}. Please verify the GEMINI_API_KEY in Vercel.`;
  }
}
