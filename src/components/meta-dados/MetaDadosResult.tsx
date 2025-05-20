
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceResultDisplay } from "@/components/shared/ResourceResultDisplay";

type MetaDadosResultProps = {
  result: MetaDataResult | null;
};

type MetaDataResult = {
  titulo?: string;
  meta_description?: string;
  heading_tags?: {
    h1?: string;
    h2?: string[];
  };
  output?: string; // Added to handle n8n webhook output format
  message?: string;
};

export function MetaDadosResult({ result }: MetaDadosResultProps) {
  // If the result is null or undefined, don't render anything
  if (!result) {
    return null;
  }

  // Show error or warning message if it exists
  if (result.message) {
    return (
      <ResourceResultDisplay 
        title="Meta Dados Gerados" 
        message={result.message}
      >
        <div></div>
      </ResourceResultDisplay>
    );
  }

  // Process output from webhook if it's in string format
  let metaTitle = "";
  let metaDescription = "";
  
  if (result.output && typeof result.output === 'string') {
    // Try to extract Meta Title and Meta Description from the output
    const lines = result.output.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes("**Meta Title:**") || line.includes("Meta Title:")) {
        // Get the next non-empty line as the title
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine && !nextLine.startsWith("**")) {
            metaTitle = nextLine;
            break;
          }
        }
      }
      
      if (line.includes("**Meta Description:**") || line.includes("Meta Descrição:")) {
        // Get the next non-empty line as the description
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine && !nextLine.startsWith("**")) {
            metaDescription = nextLine;
            break;
          }
        }
      }
    }
  } else {
    // Use direct values from the result object if they exist
    metaTitle = result.titulo || '';
    metaDescription = result.meta_description || '';
  }

  return (
    <ResourceResultDisplay title="Meta Dados Gerados">
      <div className="space-y-6">
        {metaTitle && (
          <div>
            <h3 className="text-lg font-medium mb-2">Título da Página</h3>
            <div className="bg-gray-50 p-3 rounded border">
              {metaTitle}
            </div>
          </div>
        )}
        
        {metaDescription && (
          <div>
            <h3 className="text-lg font-medium mb-2">Meta Description</h3>
            <div className="bg-gray-50 p-3 rounded border">
              {metaDescription}
            </div>
          </div>
        )}
      </div>
    </ResourceResultDisplay>
  );
}
