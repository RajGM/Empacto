import { NextRequest, NextResponse } from 'next/server';
import prisma from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { companyName, industry, goals, context } = await request.json();

    return NextResponse.json({ trainingOutline: 'test response' });

    // Step 1: Validate input
    if (!companyName || !industry || !goals) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Step 2: Call the Google AI Studio gemini 2.0-flash model
    // Replace the fetch URL & headers with the actual gemini 2.0-flash endpoint & your API key.
    // Example placeholder:
    const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
    const prompt = `
      You are an AI specialized in sustainability training.
      Company Name: ${companyName}
      Industry: ${industry}
      Sustainability Goals: ${goals}
      Additional Context: ${context}

      Please provide a comprehensive training outline covering:
      1. Introduction
      2. Key Topics
      3. Action Steps
      4. Measurement & Continuous Improvement
      5. Conclusion

      Make it actionable and industry-specific. 
    `;

    const aiResponse = await fetch('https://api.googleaistudio.example/v1/gemini-2.0-flash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        // other parameters required by the gemini 2.0-flash model
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', errorText);
      return NextResponse.json({ error: 'Failed to generate training. AI API error.' }, { status: 500 });
    }

    const aiData = await aiResponse.json();
    const trainingOutline = aiData?.result ?? 'No response from AI.';

    // Step 3: Store the data in the database
    const submission = await prisma.submission.create({
      data: {
        companyName,
        industry,
        goals,
        context,
        trainingOutline,
      },
    });

    // Step 4: Return the generated text
    return NextResponse.json({ trainingOutline: submission.trainingOutline });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
