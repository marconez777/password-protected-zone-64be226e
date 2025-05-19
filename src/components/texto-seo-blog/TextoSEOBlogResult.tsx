
import { ResourceResultDisplay } from "@/components/shared/ResourceResultDisplay";
import { formatMarkdownContent } from "@/lib/markdown-formatter";

type SEOResult = {
  titulo?: string;
  texto?: string;
  h1?: string;
  h2s?: string[];
  meta_description?: string;
  message?: string;
  output?: string; // Added to handle n8n webhook output format
  input_original?: {
    tema?: string;
    palavraChave?: string;
  };
}

export function TextoSEOBlogResult({ result }: { result: SEOResult | null }) {
  if (!result) {
    return null;
  }

  // Mostra mensagem de erro ou aviso, se existir
  if (result.message) {
    return (
      <ResourceResultDisplay 
        title="Texto SEO para Blog" 
        message={result.message}
      >
        <div></div>
      </ResourceResultDisplay>
    );
  }

  // Para respostas do formato n8n que retornam um campo "output" com todo o conteúdo
  const texto = result.output || result.texto;
  
  // Se não tiver conteúdo para mostrar
  if (!texto && !result.titulo && !result.h1) {
    return null;
  }

  // Título para o resultado com base no tema ou título gerado
  const pageTitle = result.input_original?.tema || result.titulo || "Texto SEO para Blog";

  return (
    <ResourceResultDisplay title={pageTitle}>
      <div className="bg-white rounded-lg p-4">
        {result.titulo && (
          <h2 className="text-xl font-bold text-gray-800 mb-4">{result.titulo}</h2>
        )}
        
        {texto && (
          <div className="text-gray-700">
            {formatMarkdownContent(texto)}
          </div>
        )}
        
        {result.meta_description && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Meta Description:</h3>
            <p className="pl-4 text-gray-600 italic">{result.meta_description}</p>
          </div>
        )}
      </div>
    </ResourceResultDisplay>
  );
}
