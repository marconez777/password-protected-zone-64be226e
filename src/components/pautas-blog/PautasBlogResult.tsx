
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceResultDisplay } from "@/components/shared/ResourceResultDisplay";

type PautasResult = {
  pautas?: string[];
  message?: string;
  output?: string; // Added to handle n8n webhook output format
};

export function PautasBlogResult({ result }: { result: PautasResult | null }) {
  console.log("PautasBlogResult received:", result);
  
  if (!result) {
    return null;
  }

  // Mostra mensagem de erro ou aviso, se existir
  if (result.message) {
    return (
      <ResourceResultDisplay 
        title="Ideias de Pautas para Blog" 
        message={result.message}
      >
        <div></div>
      </ResourceResultDisplay>
    );
  }

  // Process the output if it's a string (from n8n webhook)
  let processedPautas: string[] = [];
  
  if (result.output && typeof result.output === 'string') {
    // Try to extract list items from the markdown output
    const lines = result.output.split('\n');
    
    // Look for list items (numbered or bullet points)
    processedPautas = lines
      .filter(line => {
        // Match lines that start with numbers, asterisks, or dashes (common markdown list formats)
        const trimmed = line.trim();
        return (
          // Numbered items like "1. Item"
          /^\d+\.\s+\*\*.*\*\*/.test(trimmed) || 
          // Bold items with asterisks or dash
          /^[\*\-]\s+\*\*.*\*\*/.test(trimmed) ||
          // Just grab anything with a number followed by a dot (fallback)
          /^\d+\..*$/.test(trimmed)
        );
      })
      .map(line => {
        // Clean up the line by removing list markers and extracting just the content
        let content = line.trim()
          // Remove numbers at start
          .replace(/^\d+\.\s+/, '')
          // Remove asterisks/dashes at start
          .replace(/^[\*\-]\s+/, '');
          
        // Remove bold markers if present
        if (content.startsWith('**')) {
          content = content.replace(/^\*\*(.*?)\*\*(.*)$/, '$1$2');
        }
        
        return content.trim();
      })
      .filter(item => item.length > 0);
      
    // If no list items were found but we have content, use sections as items
    if (processedPautas.length === 0) {
      // Try to extract header sections as individual items
      processedPautas = lines
        .filter(line => line.trim().startsWith('##') || line.trim().startsWith('###'))
        .map(line => line.trim().replace(/^#+\s+/, ''))
        .filter(item => item.length > 0);
    }
    
    // Last resort: if we still couldn't find any structured content, split by paragraphs
    if (processedPautas.length === 0 && result.output.length > 0) {
      processedPautas = result.output
        .split('\n\n')
        .filter(paragraph => paragraph.trim().length > 10)
        .map(paragraph => paragraph.trim())
        .slice(0, 10); // Limit to 10 items if parsing paragraphs
    }
  }

  // If we have processed pautas from the output or original pautas array
  const pautasToDisplay = processedPautas.length > 0 ? processedPautas : result.pautas || [];
  
  // Se não tiver pautas para mostrar
  if (pautasToDisplay.length === 0) {
    return (
      <ResourceResultDisplay title="Ideias de Pautas Geradas">
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-700">Nenhuma pauta foi gerada. Tente novamente com outra palavra-chave.</p>
        </div>
      </ResourceResultDisplay>
    );
  }

  return (
    <ResourceResultDisplay title="Ideias de Pautas Geradas">
      <div className="bg-white rounded-lg p-4">
        <ul className="list-disc pl-5 space-y-2">
          {pautasToDisplay.map((pauta, index) => (
            <li key={index} className="text-gray-800">{pauta}</li>
          ))}
        </ul>
      </div>
    </ResourceResultDisplay>
  );
}
