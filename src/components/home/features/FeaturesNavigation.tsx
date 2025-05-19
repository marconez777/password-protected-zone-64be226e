
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Feature } from './featuresData';

type FeaturesNavigationProps = {
  features: Feature[];
  activeFeature: string;
  onFeatureChange: (value: string) => void;
};

const FeaturesNavigation = ({
  features,
  activeFeature,
  onFeatureChange,
}: FeaturesNavigationProps) => {
  return (
    <div className="flex justify-center mb-12 overflow-x-auto pb-4">
      <ToggleGroup 
        type="single" 
        value={activeFeature} 
        onValueChange={(value) => value && onFeatureChange(value)} 
        className="flex space-x-4"
      >
        {features.map((feature) => (
          <ToggleGroupItem
            key={feature.id}
            value={feature.id}
            className={`border border-[#805af5] rounded-full px-6 py-2 text-white hover:bg-[#805af5]/10 transition-all ${
              activeFeature === feature.id ? 'bg-[#805af5]/20' : 'bg-transparent'
            }`}
          >
            {feature.title}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default FeaturesNavigation;
