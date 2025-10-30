
import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ImageGallery } from './components/ImageGallery';
import { Header } from './components/Header';
import { ImageGenerationOptions } from './types';
import { generateImagesFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [options, setOptions] = useState<ImageGenerationOptions>({
    prompt: 'A photorealistic image of a futuristic city skyline at dusk, with flying vehicles and neon lights, cinematic lighting.',
    negativePrompt: '',
    numberOfImages: 1,
    aspectRatio: '16:9',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesFromPrompt(options);
      setGeneratedImages(images);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const handleOptionsChange = useCallback((newOptions: Partial<ImageGenerationOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-theme(space.16))]">
        <aside className="w-full md:w-96 lg:w-1/4 p-4 md:p-6 bg-gray-800/50 border-r border-gray-700/50 overflow-y-auto">
          <ControlPanel 
            options={options} 
            onOptionsChange={handleOptionsChange}
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
          />
        </aside>
        <section className="flex-grow p-4 md:p-6 overflow-y-auto">
          <ImageGallery 
            images={generatedImages} 
            isLoading={isLoading} 
            error={error} 
          />
        </section>
      </main>
    </div>
  );
};

export default App;
