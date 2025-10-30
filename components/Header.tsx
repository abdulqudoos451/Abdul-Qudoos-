
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700/50 h-16 shrink-0">
      <div className="flex items-center space-x-3">
        <SparklesIcon className="h-6 w-6 text-indigo-400" />
        <h1 className="text-xl font-bold text-gray-100 tracking-tight">
          ProVision AI Studio
        </h1>
      </div>
       <div className="text-sm text-gray-500">
          Powered by Imagen 4
        </div>
    </header>
  );
};
