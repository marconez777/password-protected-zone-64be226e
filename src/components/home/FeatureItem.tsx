
import React from 'react';
import { Button } from '@/components/ui/button';
import { Feature } from './featuresData';
import { motion } from 'framer-motion';

interface FeatureItemProps {
  feature: Feature;
  onStartNow: () => void;
}

const FeatureItem = ({ feature, onStartNow }: FeatureItemProps) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center justify-between gap-8 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="w-full md:w-1/3">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {feature.subtitle}
        </motion.h3>
        <motion.ul 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {feature.bulletPoints.map((point, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
            >
              <div className="flex-shrink-0 w-5 h-5 mr-2 bg-[#805af5] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-white">{point}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button 
            onClick={onStartNow}
            className="mt-6 bg-[#805af5] hover:bg-[#6e46c5] text-white px-6 py-4 h-auto rounded-md flex items-center"
          >
            Começar agora! <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>
      <motion.div 
        className="w-full md:w-2/3 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <img 
          src={feature.imagePath} 
          alt={feature.title} 
          className="w-full h-auto max-h-[450px] rounded-lg border border-[#805af5]/30 shadow-lg object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default FeatureItem;
