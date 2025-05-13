
import React from "react";
import LandingHeader from "./LandingHeader";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#100F13] font-sans">
      <LandingHeader />
      <main>{children}</main>
    </div>
  );
};

export default LandingLayout;
