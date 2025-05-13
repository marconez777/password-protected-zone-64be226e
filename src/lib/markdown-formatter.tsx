
import React from 'react';

/**
 * Formata o conteúdo markdown para exibição
 * Converte marcações simples como **negrito**, *itálico*, listas e subtítulos
 */
export function formatMarkdownContent(content: string): React.ReactNode {
  if (!content) return null;
  
  // Função para processar o conteúdo markdown
  const processText = (text: string) => {
    // Processar negrito
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Processar itálico
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Processar títulos
    text = text.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mb-2">$1</h3>');
    text = text.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mb-3">$1</h2>');
    text = text.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>');
    
    // Processar listas
    text = text.replace(/^- (.*?)$/gm, '<li class="ml-5 list-disc">$1</li>');
    text = text.replace(/^[0-9]+\. (.*?)$/gm, '<li class="ml-5 list-decimal">$1</li>');
    
    // Processar quebras de linha
    text = text.replace(/\n\n/g, '<br /><br />');
    
    return text;
  };
  
  const processedContent = processText(content);
  
  return (
    <div 
      className="prose prose-slate max-w-none" 
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
}
