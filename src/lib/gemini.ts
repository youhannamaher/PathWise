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

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI report.";
  }
}

export async function askCareerCoach(history: {role: string, content: string}[], message: string, contextData: any) {
  const genAI = getGenAI();
  if (!genAI) return "I cannot connect to my AI brain right now. Please check the API configuration.";

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
    systemInstruction: `You are PathWise AI, an expert academic and career coach for high school students in Egypt.
Be helpful, clear, and practical. Do not overpromise career outcomes. 
If asked about tuition fees, do not hallucinate exact numbers unless provided in the context; instead refer to budget tiers (Low, Medium, High, Very High).
Here is the student's context: ${JSON.stringify(contextData)}`
  });

  try {
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am having trouble processing that right now. Please try again later.";
  }
}
