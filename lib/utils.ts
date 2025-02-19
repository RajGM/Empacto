import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY);
/**
 * Generates a prompt instructing the AI to return a sustainability training outline in a predictable JSON format.
 * 
 * @param companyName - The name of the company
 * @param industry - The industry of the company
 * @param goals - The sustainability goals
 * @param context - Additional context that might influence the training outline
 * @returns A prompt string suitable for sending to an LLM
 */
export function createSustainabilityPrompt(
  companyName: string,
  industry: string,
  goals: string,
  context?: string
): string {
  return `
You are an AI specialized in sustainability training.

Please analyze the following data:
- Company Name: ${companyName}
- Industry: ${industry}
- Sustainability Goals: ${goals}
- Additional Context: ${context || '(none provided)'}

Using this information, generate an **actionable** sustainability training outline.


**Guidelines**:
1. "introduction": Provide 2–3 sentences that set the context for the training program, tailored to the ${industry} industry.
2. "keyTopics": List the most relevant sustainability topics, each as an object with "topicTitle" and a 1–2 sentence "description".
3. "actionSteps": Propose actionable steps (policies, processes, or projects) for the company. Each step is an object with "stepTitle" and "instructions".
4. "measurementAndContinuousImprovement": Suggest metrics or methods to track progress and improve over time.
5. "conclusion": Summarize how these steps will help ${companyName} meet its sustainability goals.

Provide a sustainability training outline in valid JSON only, matching the schema:
{
  "introduction": "<string>",
  "keyTopics": [...],
  "actionSteps": [...],
  "measurementAndContinuousImprovement": "<string>",
  "conclusion": "<string>"
}
`;
}

const sustainabilityOutlineSchema = {
  type: SchemaType.OBJECT,
  description: "JSON structure for a sustainability training outline",
  properties: {
    introduction: {
      type: SchemaType.STRING,
      description: "Introduction to the sustainability training"
    },
    keyTopics: {
      type: SchemaType.ARRAY,
      description: "A list of key sustainability topics",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          topicTitle: {
            type: SchemaType.STRING,
            description: "Title of the key topic"
          },
          description: {
            type: SchemaType.STRING,
            description: "A short description of the key topic"
          }
        },
        required: ["topicTitle", "description"]
      }
    },
    actionSteps: {
      type: SchemaType.ARRAY,
      description: "Concrete steps or tasks to achieve sustainability goals",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          stepTitle: {
            type: SchemaType.STRING,
            description: "Title or name of the action step"
          },
          instructions: {
            type: SchemaType.STRING,
            description: "Detailed instructions for how to execute the step"
          }
        },
        required: ["stepTitle", "instructions"]
      }
    },
    measurementAndContinuousImprovement: {
      type: SchemaType.STRING,
      description: "Methods to measure progress and continuously improve"
    },
    conclusion: {
      type: SchemaType.STRING,
      description: "Final thoughts or summary of the sustainability outline"
    }
  },
  required: [
    "introduction",
    "keyTopics",
    "actionSteps",
    "measurementAndContinuousImprovement",
    "conclusion"
  ]
};

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: sustainabilityOutlineSchema
  },
});