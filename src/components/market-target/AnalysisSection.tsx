
import React from 'react';
import { FormattedMarkdownContent } from './FormattedMarkdownContent';

interface AnalysisSectionProps {
  title: string;
  content: string;
}

export function AnalysisSection({ title, content }: AnalysisSectionProps) {
  if (!content) return null;
  
  return (
    <div className="bg-accent rounded-lg p-4">
      <h4 className="text-lg font-bold text-mkranker-purple mb-3 border-b border-mkranker-purple/20 pb-1">
        {title}
      </h4>
      <FormattedMarkdownContent content={content} />
    </div>
  );
}
