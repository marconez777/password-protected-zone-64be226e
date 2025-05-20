
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
};

export function TextoSEOLPResult({ result }: { result: SEOResult | null }) {
  if (!result) {
    return null;
  }

  // Mostra mensagem de erro ou aviso, se existir
  if (result.message) {
    return <ResourceResultDisplay title="" message={result.message}>
      <div></div>
    </ResourceResultDisplay>;
  }

  // Processa o resultado do webhook se vier no formato output
  const processedResult = {
    texto: result.texto || result.output,
    titulo: result.titulo,
    h1: result.h1,
    h2s: result.h2s,
    meta_description: result.meta_description
  };

  // Se não tiver conteúdo para mostrar
  if (!processedResult.texto && !processedResult.titulo && !processedResult.h1) {
    return null;
  }

  // Título com base no tema da pesquisa ou no título do resultado
  const pageTitle = result.input_original?.tema || processedResult.titulo || "Texto SEO para Landing Page";

  return (
    <ResourceResultDisplay title={pageTitle}>
      <div className="bg-white rounded-lg p-4">
        {processedResult.titulo && (
          <h2 className="text-xl font-bold text-gray-800 mb-4">{processedResult.titulo}</h2>
        )}
        
        {processedResult.texto && (
          <div className="text-gray-700">
            {formatMarkdownContent(processedResult.texto)}
          </div>
        )}

        {processedResult.meta_description && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Meta Description:</h3>
            <p className="pl-4 text-gray-600 italic">{processedResult.meta_description}</p>
          </div>
        )}
      </div>
    </ResourceResultDisplay>
  );
}
