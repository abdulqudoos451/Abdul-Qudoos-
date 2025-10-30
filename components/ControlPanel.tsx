
import React from 'react';
import { ImageGenerationOptions, AspectRatio } from '../types';
import { GenerateIcon } from './icons/GenerateIcon';

interface ControlPanelProps {
  options: ImageGenerationOptions;
  onOptionsChange: (newOptions: Partial<ImageGenerationOptions>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: '16:9', label: '16:9 Landscape' },
  { value: '1:1', label: '1:1 Square' },
  { value: '9:16', label: '9:16 Portrait' },
  { value: '4:3', label: '4:3 Standard' },
  { value: '3:4', label: '3:4 Vertical' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({ options, onOptionsChange, onGenerate, isLoading }) => {
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onOptionsChange({ prompt: e.target.value });
  };

  const handleNegativePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onOptionsChange({ negativePrompt: e.target.value });
  };

  const handleAspectRatioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onOptionsChange({ aspectRatio: e.target.value as AspectRatio });
  };
  
  const handleNumberOfImagesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     onOptionsChange({ numberOfImages: parseInt(e.target.value, 10) });
  };

  return (
    <div className="flex flex-col space-y-6 h-full">
        <div className="flex-grow flex flex-col space-y-6">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                    Prompt
                </label>
                <textarea
                    id="prompt"
                    value={options.prompt}
                    onChange={handlePromptChange}
                    placeholder="Describe the image you want to create..."
                    className="w-full h-48 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-200 resize-none"
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="negative-prompt" className="block text-sm font-medium text-gray-300 mb-2">
                    Negative Prompt (Optional)
                </label>
                <textarea
                    id="negative-prompt"
                    value={options.negativePrompt || ''}
                    onChange={handleNegativePromptChange}
                    placeholder="e.g., text, watermarks, blurry..."
                    className="w-full h-24 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-200 resize-none"
                    disabled={isLoading}
                />
            </div>
            
            <div>
                <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">
                    Aspect Ratio
                </label>
                <select
                    id="aspectRatio"
                    value={options.aspectRatio}
                    onChange={handleAspectRatioChange}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-200"
                    disabled={isLoading}
                >
                    {aspectRatios.map(ar => (
                        <option key={ar.value} value={ar.value}>{ar.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="numberOfImages" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Images
                </label>
                <select
                    id="numberOfImages"
                    value={options.numberOfImages}
                    onChange={handleNumberOfImagesChange}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-200"
                    disabled={isLoading}
                >
                    {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="shrink-0">
            <button
                onClick={onGenerate}
                disabled={isLoading || !options.prompt.trim()}
                className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : (
                    <>
                        <GenerateIcon className="h-5 w-5 mr-2" />
                        Generate
                    </>
                )}
            </button>
        </div>
    </div>
  );
};
