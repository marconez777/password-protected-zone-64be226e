
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Feature } from './featuresData';
import { motion } from 'framer-motion';

interface FeaturesNavigationProps {
  features: Feature[];
  activeFeature: string;
  onFeatureChange: (value: string) => void;
}

const FeaturesNavigation = ({ features, activeFeature, onFeatureChange }: FeaturesNavigationProps) => {
  return (
    <div className="flex justify-center mb-12 overflow-x-auto pb-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onFeatureChange(feature.id)}
            className={`rounded-full px-6 py-3 text-white transition-all border ${
              activeFeature === feature.id 
                ? 'bg-[#805af5] border-[#9b87f5] text-white' 
                : 'bg-[#1A1F2C] border-[#2e3447] hover:border-[#805af5]/50'
            }`}
          >
            <span className="relative inline-block whitespace-nowrap">
              {feature.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturesNavigation;
