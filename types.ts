
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface ImageGenerationOptions {
  prompt: string;
  negativePrompt?: string;
  numberOfImages: number;
  aspectRatio: AspectRatio;
}
