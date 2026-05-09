import { NextResponse } from "next/server";
import { askCareerCoach } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, history, contextData } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const reply = await askCareerCoach(history || [], message, contextData || {});

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Coach API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
