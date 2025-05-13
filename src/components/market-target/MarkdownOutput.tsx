
import React from 'react';
import { FormattedMarkdownContent } from './FormattedMarkdownContent';

interface MarkdownOutputProps {
  output: string;
}

export function MarkdownOutput({ output }: MarkdownOutputProps) {
  if (!output) return null;
  
  return (
    <div className="max-w-none">
      <FormattedMarkdownContent content={output} />
    </div>
  );
}
