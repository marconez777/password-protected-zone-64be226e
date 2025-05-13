
import React from "react";

const BackgroundGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), 
                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
};

export default BackgroundGrid;
