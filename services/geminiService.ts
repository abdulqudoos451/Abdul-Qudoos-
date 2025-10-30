
import { GoogleGenAI } from "@google/genai";
import { ImageGenerationOptions } from '../types';

export const generateImagesFromPrompt = async (options: ImageGenerationOptions): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const config: {
      numberOfImages: number;
      outputMimeType: string;
      aspectRatio: string;
      negativePrompt?: string;
  } = {
    numberOfImages: options.numberOfImages,
    outputMimeType: 'image/png',
    aspectRatio: options.aspectRatio,
  };

  if (options.negativePrompt && options.negativePrompt.trim()) {
      config.negativePrompt = options.negativePrompt.trim();
  }

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: options.prompt,
      config: config,
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The API did not return any images.");
    }

    return response.generatedImages.map(img => {
      const base64ImageBytes: string = img.image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    });

  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error(`Failed to generate images. Please check your prompt and API key. Details: ${error instanceof Error ? error.message : String(error)}`);
  }
};
