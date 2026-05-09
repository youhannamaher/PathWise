import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will fail.");
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

export async function generateAIReport(assessment: any) {
  try {
    const genAI = getGenAI();
    if (!genAI) return "AI Report generation is disabled due to missing API key.";

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
    return `Error generating report: ${error.message}`;
  }
}

export async function askCareerCoach(history: {role: string, content: string}[], message: string, contextData: any) {
  try {
    const genAI = getGenAI();
    if (!genAI) return "I cannot connect to my AI brain right now. Please check the API configuration.";

    // Use the most compatible model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    // Instructions and context
    const systemPrompt = `You are PathWise AI, an expert academic and career coach for high school students in Egypt.
Be helpful, clear, and practical. Your goal is to help the student choose between the universities and programs they have saved.

CRITICAL: ONLY recommend programs from the student's saved list provided below. Do not make up universities.
Student's Saved Programs: ${JSON.stringify(contextData.savedPrograms || [])}
Student's Assessment: ${JSON.stringify(contextData.assessment || "No assessment yet")}

If asked for a recommendation, analyze their interests/skills from the assessment and compare them against the programs in their saved list. Pick the top 1-3 that match best and explain why.`;

    // Sanitize history: must alternate user/model and start with user
    const sanitizedHistory = history
      .filter(msg => typeof msg.content === 'string' && msg.content.trim() !== "")
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    // If history is empty or doesn't start with user, we'll prepend a dummy user/model if needed, 
    // but better to just start fresh if it's invalid
    const finalHistory = [];
    if (sanitizedHistory.length > 0 && sanitizedHistory[0].role === 'user') {
      // Basic alternation check
      let lastRole = "";
      for (const msg of sanitizedHistory) {
        if (msg.role !== lastRole) {
          finalHistory.push(msg);
          lastRole = msg.role;
        }
      }
    }

    // Start chat with system prompt as the first message or in the instruction
    // We'll use the simplest method: prepend it to the current message if history is empty
    let finalMessage = message;
    if (finalHistory.length === 0) {
      finalMessage = `${systemPrompt}\n\nUser Question: ${message}`;
    }

    const chat = model.startChat({
      history: finalHistory,
    });

    const result = await chat.sendMessage(finalMessage);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return `Error from Google AI: ${error.message || "Unknown error"}. Please check your API key and Vercel settings.`;
  }
}
