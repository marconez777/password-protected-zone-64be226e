
import React from 'react';

const CompaniesSection = () => {
  return (
    <div className="w-full py-16 bg-[#0c0a11]">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl text-gray-300 font-medium mb-12">
          MELHORES I.A. DO MERCADO
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          <div className="w-40 h-16 flex items-center justify-center">
            <img 
              src="/lovable-uploads/1b53c5c9-295a-4152-a7d4-9cead27d09bf.png" 
              alt="Leonardo.Ai" 
              className="max-h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          
          <div className="w-40 h-16 flex items-center justify-center">
            <img 
              src="/lovable-uploads/d64b34e7-caf8-49c0-8617-e66a9df3ac78.png" 
              alt="ChatGPT" 
              className="max-h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          
          <div className="w-40 h-16 flex items-center justify-center">
            <img 
              src="/lovable-uploads/3d0e3a7e-4aac-4a10-9834-d208c5a87408.png" 
              alt="Gemini" 
              className="max-h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesSection;
