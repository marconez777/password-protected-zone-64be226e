
import React from 'react';

/**
 * Format markdown headings to proper HTML elements
 */
export const formatHeadings = (text: string): string => {
  if (!text) return '';
  
  // Replace # headings with proper HTML elements
  return text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
    const level = hashes.length;
    const className = level === 1 
      ? "text-2xl font-bold text-mkranker-purple mt-4 mb-3" 
      : level === 2 
        ? "text-xl font-bold text-mkranker-purple mt-3 mb-2" 
        : "text-lg font-bold text-mkranker-purple mt-2 mb-1";
    
    return `<h${level} class="${className}">${content}</h${level}>`;
  });
};

/**
 * Format bold text (converts **text** to <strong> elements)
 */
export const formatBoldText = (text: string): React.ReactNode => {
  if (!text) return null;
  
  // Handle **text** format (Markdown bold)
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

/**
 * Process markdown content into React elements
 */
export const formatMarkdownContent = (text: string): JSX.Element[] => {
  if (!text) return [];
  
  // First format headings
  let formattedText = formatHeadings(text);
  
  // Process the content line by line
  const lines = formattedText.split('\n');
  const result: JSX.Element[] = [];
  let inList = false;
  let listItems: string[] = [];
  
  lines.forEach((line, index) => {
    // If it's already an HTML heading (from formatHeadings), render it directly
    if (line.startsWith('<h')) {
      // First close any open list
      if (inList) {
        result.push(
          <ul key={`list-${index}`} className="list-disc pl-5 my-2">
            {listItems.map((item, i) => (
              <li key={i} className="mb-1">{formatBoldText(item)}</li>
            ))}
          </ul>
        );
        inList = false;
        listItems = [];
      }
      
      // Then render the heading
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = line;
      
      // Fix error: Ensure the element exists and is an Element type before calling getAttribute
      const firstElement = tempDiv.firstElementChild;
      const className = firstElement ? firstElement.getAttribute('class') || '' : '';
      const content = tempDiv.textContent || '';
      
      // Extract the tag name (h1, h2, etc.)
      const tagMatch = line.match(/<(h[1-6])/);
      const Tag = tagMatch ? tagMatch[1] as keyof JSX.IntrinsicElements : 'div';
      
      result.push(
        React.createElement(
          Tag, 
          { key: index, className }, 
          formatBoldText(content)
        )
      );
    }
    else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      // If it's a list item
      inList = true;
      listItems.push(line.trim().substring(2));
    }
    else {
      // If it's not a list item but we have an open list
      if (inList) {
        result.push(
          <ul key={`list-${index}`} className="list-disc pl-5 my-2">
            {listItems.map((item, i) => (
              <li key={i} className="mb-1">{formatBoldText(item)}</li>
            ))}
          </ul>
        );
        inList = false;
        listItems = [];
      }
      
      // If it's a regular paragraph
      if (line.trim()) {
        result.push(<p key={index} className="mb-2">{formatBoldText(line)}</p>);
      } else {
        result.push(<div key={index} className="h-2" />);
      }
    }
  });
  
  // Close any open list at the end
  if (inList) {
    result.push(
      <ul key="final-list" className="list-disc pl-5 my-2">
        {listItems.map((item, i) => (
          <li key={i} className="mb-1">{formatBoldText(item)}</li>
        ))}
      </ul>
    );
  }
  
  return result;
};
