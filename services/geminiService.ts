import { GoogleGenAI, Type } from '@google/genai';
import { TranslationResult, Phrase, QuizQuestion } from '../types';
import { GEMINI_TEXT_MODEL, GEMINI_VISION_MODEL } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const translationSchema = {
  type: Type.OBJECT,
  properties: {
    hindi: { type: Type.STRING, description: "The translation in Hindi script." },
    romanized: { type: Type.STRING, description: "The phonetic, romanized version of the Hindi translation." },
  },
  required: ['hindi', 'romanized'],
};

const phrasebookSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            english: { type: Type.STRING },
            hindi: { type: Type.STRING },
            romanized: { type: Type.STRING },
        },
        required: ['english', 'hindi', 'romanized'],
    }
};

const quizSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "The English question about Hindi vocabulary or phrases." },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 4 possible answers in Hindi script."
        },
        correctAnswerIndex: { type: Type.INTEGER, description: "The 0-based index of the correct answer in the options array." }
      },
      required: ['question', 'options', 'correctAnswerIndex'],
    }
  };

export const translateText = async (englishText: string): Promise<TranslationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: `Translate the following English phrase to Hindi. Provide both the Devanagari script and a simple, phonetic romanized version for pronunciation. Phrase: "${englishText}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: translationSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as TranslationResult;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Failed to get translation from Gemini API.");
  }
};

export const getCommonPhrases = async (category: string): Promise<Phrase[]> => {
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_TEXT_MODEL,
            contents: `Generate a list of 8 essential and common phrases for a tourist in India related to the category: "${category}". For each phrase, provide the English, the Hindi translation in Devanagari script, and a simple, phonetic romanized version.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: phrasebookSchema,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Phrase[];

    } catch (error) {
        console.error(`Error fetching phrases for category ${category}:`, error);
        throw new Error("Failed to get phrases from Gemini API.");
    }
};

export const identifyImage = async (imageBase64: string, mimeType: string): Promise<TranslationResult> => {
    try {
        const imagePart = {
            inlineData: { data: imageBase64, mimeType },
        };
        const textPart = {
            text: 'Identify the main object in this image. Provide its name in Hindi (Devanagari script) and a simple, phonetic romanized version.'
        };

        const response = await ai.models.generateContent({
            model: GEMINI_VISION_MODEL,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: translationSchema,
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as TranslationResult;

    } catch(error) {
        console.error("Error identifying image:", error);
        throw new Error("Failed to identify the image with Gemini API.");
    }
};


export const generateQuiz = async (category: string): Promise<QuizQuestion[]> => {
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_TEXT_MODEL,
            contents: `Generate a quiz with 5 multiple-choice questions for a beginner learning Hindi, focused on the category: "${category}". Each question should have one English prompt, 4 possible answers in Hindi script, and the index of the correct answer. The difficulty should be easy to medium.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: quizSchema,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as QuizQuestion[];

    } catch (error) {
        console.error(`Error generating quiz for category ${category}:`, error);
        throw new Error("Failed to generate a quiz from Gemini API.");
    }
};
