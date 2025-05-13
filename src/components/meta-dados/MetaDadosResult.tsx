
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
  output?: string; // Adicionado para lidar com o formato de saída do n8n
  message?: string;
};

export function MetaDadosResult({ result }: MetaDadosResultProps) {
  // Se o resultado for null ou undefined, não renderize nada
  if (!result) {
    return null;
  }

  // Mostra mensagem de erro ou aviso, se existir
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

  // Processar a saída se for uma string (do webhook n8n)
  let titulo = "";
  let metaDescription = "";
  
  if (result.output && typeof result.output === 'string') {
    // Tentar extrair Meta Title e Meta Description
    const lines = result.output.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes("**Meta Title:**") || line.includes("Meta Title:")) {
        // Pegar a próxima linha não vazia como título
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine && !nextLine.startsWith("**")) {
            titulo = nextLine;
            break;
          }
        }
      }
      
      if (line.includes("**Meta Description:**") || line.includes("Meta Description:")) {
        // Pegar a próxima linha não vazia como descrição
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
    // Usar os valores diretos do resultado se existirem
    titulo = typeof result.titulo === 'string' ? result.titulo : '';
    metaDescription = typeof result.meta_description === 'string' ? result.meta_description : '';
  }
  
  // Garantir que o h1 seja string
  const h1 = result.heading_tags?.h1 || '';
  
  // Garantir que h2 seja um array de strings
  const h2Array = Array.isArray(result.heading_tags?.h2) ? result.heading_tags?.h2 : [];

  return (
    <ResourceResultDisplay title="Meta Dados Gerados">
      <div className="space-y-6">
        {titulo && (
          <div>
            <h3 className="text-lg font-medium mb-2">Título da Página</h3>
            <div className="bg-gray-50 p-3 rounded border">
              {titulo}
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
        
        {h1 && (
          <div>
            <h3 className="text-lg font-medium mb-2">H1</h3>
            <div className="bg-gray-50 p-3 rounded border">
              {h1}
            </div>
          </div>
        )}
        
        {h2Array.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">H2</h3>
            <ul className="list-disc pl-5 space-y-2">
              {h2Array.map((heading, index) => (
                <li key={index} className="bg-gray-50 p-3 rounded border">
                  {heading}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ResourceResultDisplay>
  );
}
