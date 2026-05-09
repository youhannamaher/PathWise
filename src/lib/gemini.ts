import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will fail.");
    return null;
  }
  // Using v1beta as it is more compatible with the latest 1.5 models across all regions
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

    // Use standard model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    // Instructions and context
    const systemPrompt = `You are PathWise AI, an expert academic and career coach for high school students in Egypt.
Be helpful, clear, and practical. Your goal is to help the student choose between the universities and programs they have saved.

CRITICAL: ONLY recommend programs from the student's saved list provided below. Do not make up universities.
Student's Saved Programs: ${JSON.stringify(contextData?.savedPrograms || [])}
Student's Assessment: ${JSON.stringify(contextData?.assessment || "No assessment yet")}

If asked for a recommendation, analyze their interests/skills from the assessment and compare them against the programs in their saved list. Pick the top 1-3 that match best and explain why.`;

    // Sanitize history: must alternate user/model and start with user
    const sanitizedHistory = history
      .filter(msg => typeof msg.content === 'string' && msg.content.trim() !== "")
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    // Ensure history starts with 'user'
    while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== 'user') {
      sanitizedHistory.shift();
    }

    // Ensure alternation
    const finalHistory = [];
    let lastRole = "";
    for (const msg of sanitizedHistory) {
      if (msg.role !== lastRole) {
        finalHistory.push(msg);
        lastRole = msg.role;
      }
    }

    // Prepend system prompt to the user message for context reinforcement
    const enhancedMessage = `${systemPrompt}\n\nUSER MESSAGE: ${message}`;

    const chat = model.startChat({
      history: finalHistory,
    });

    const result = await chat.sendMessage(enhancedMessage);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    // Return a slightly more user-friendly error but include the technical detail for us
    return `AI Connection Error: ${error.message || "Unknown error"}. (Note: Ensure your Google AI Studio key is active and check the Vercel logs if this persists).`;
  }
}
