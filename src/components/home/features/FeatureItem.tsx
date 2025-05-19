
import React from 'react';
import { Button } from '@/components/ui/button';

interface FeatureItemProps {
  title: string;
  description: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  bulletPoints,
  imageSrc,
  imageAlt,
}) => {
  const handleStartNow = () => {
    window.open('https://pay.kiwify.com.br/sZRHsgM', '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
      <div className="w-full md:w-1/3">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {title}
        </h3>
        <ul className="space-y-4">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-white">{point}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={handleStartNow}
          className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
        >
          Começar agora! <span className="ml-2">→</span>
        </Button>
      </div>
      <div className="w-full md:w-2/3 flex justify-center">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureItem;
