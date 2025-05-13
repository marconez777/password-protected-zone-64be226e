
import { ResourceResultDisplay } from "@/components/shared/ResourceResultDisplay";

type SEOResult = {
  titulo?: string;
  texto?: string;
  h1?: string;
  h2s?: string[];
  meta_description?: string;
  message?: string;
  output?: string; // Added to handle n8n webhook output format
  input_original?: {
    nomeProduto?: string;
    palavraChave?: string;
  };
};

export function TextoSEOProdutoResult({ result }: { result: SEOResult | null }) {
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

  // Função para formatar texto com negrito
  const formatBoldText = (text: string) => {
    if (!text) return null;
    
    // Substitui **texto** por <strong>texto</strong>
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };
  
  // Função para converter texto em lista quando tem linhas com "- "
  const formatList = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const result: JSX.Element[] = [];
    let inList = false;
    let listItems: string[] = [];
    
    lines.forEach((line, index) => {
      if (line.trim().startsWith('- ')) {
        // Se é um item de lista
        inList = true;
        listItems.push(line.trim().substring(2));
      } else if (line.trim().startsWith('### ')) {
        // Se é um título H3
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
        
        result.push(<h3 key={index} className="text-xl font-semibold mt-4 mb-2">{formatBoldText(line.substring(4))}</h3>);
      } else {
        // Se não é item de lista, mas tinha uma lista antes
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
        
        // Adiciona linha normal
        if (line.trim()) {
          result.push(<p key={index} className="mb-2">{formatBoldText(line)}</p>);
        } else {
          result.push(<div key={index} className="h-2" />);
        }
      }
    });
    
    // Se terminar com lista
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

  // Título com base no nome do produto ou no título do resultado
  const pageTitle = result.input_original?.nomeProduto || processedResult.titulo || "Texto SEO para Produto";

  return (
    <ResourceResultDisplay title={pageTitle}>
      <div className="bg-white rounded-lg p-4">
        {processedResult.titulo && (
          <h2 className="text-xl font-bold text-gray-800 mb-4">{processedResult.titulo}</h2>
        )}
        
        {processedResult.texto && (
          <div className="whitespace-pre-wrap text-gray-700">
            {formatList(processedResult.texto)}
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
