import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { model, createSustainabilityPrompt } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    // 1. Parse incoming JSON
    const { companyName, industry, goals, context } = await request.json();

    // Optional: Validate input
    if (!companyName || !industry || !goals) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, industry, or goals." },
        { status: 400 }
      );
    }

    const prompt = createSustainabilityPrompt(
      companyName,
      industry,
      goals,
      context
    );

    // 4. Generate content from the model
    const result = await model.generateContent(prompt);

    // Depending on the library’s return shape,
    // you may need to adjust how you read the text response:
    const trainingOutline = await result.response.text();

    // 5. (Optional) Save to database
    await prisma.submission.create({
      data: {
        companyName,
        industry,
        goals,
        context,
        trainingOutline,
      },
    });

    // 6. Return the result
    return NextResponse.json({ trainingOutline });
  } catch (err: any) {
    console.error("Error generating AI content:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
