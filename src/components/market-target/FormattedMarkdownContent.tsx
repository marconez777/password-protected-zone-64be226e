
import React from 'react';
import { formatMarkdownContent } from '@/lib/markdown-formatter';

interface FormattedMarkdownContentProps {
  content: string;
}

export function FormattedMarkdownContent({ content }: FormattedMarkdownContentProps) {
  if (!content) return null;
  
  return (
    <div className="whitespace-pre-wrap">
      {formatMarkdownContent(content)}
    </div>
  );
}
