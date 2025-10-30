
import React from 'react';
import { ImageIcon } from './icons/ImageIcon';

interface ImageGalleryProps {
  images: string[];
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
    <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4"></div>
    <h3 className="text-lg font-semibold text-gray-300">Generating Images...</h3>
    <p className="mt-1 max-w-md">Your creations are being processed by Imagen 4. This may take a moment. High-quality art requires a little patience!</p>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 border-2 border-dashed border-gray-700 rounded-lg p-8">
    <ImageIcon className="h-16 w-16 mb-4" />
    <h3 className="text-xl font-semibold text-gray-300">Image Gallery</h3>
    <p className="mt-2 max-w-sm">Your generated images will appear here. Configure your prompt and settings in the panel and click 'Generate' to begin.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-red-300">Generation Failed</h3>
        <p className="mt-2 max-w-md text-sm">{message}</p>
  </div>
);

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (images.length === 0) {
    return <Placeholder />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((src, index) => (
        <div key={index} className="aspect-video bg-gray-800 rounded-lg overflow-hidden group relative border-2 border-transparent hover:border-indigo-500 transition-all duration-300">
          <img src={src} alt={`Generated image ${index + 1}`} className="w-full h-full object-contain" />
          <a
            href={src}
            download={`provision-image-${index + 1}.png`}
            className="absolute bottom-2 right-2 bg-gray-900/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-600"
            title="Download Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};
