import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY from environment

export async function POST(req) {
  try {
    const formData = await req.formData();
    const content = formData.get("content");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a short comical blog post with the topic:${content}`,
    });

    return NextResponse.json({ success: true, blogContent: response.text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
