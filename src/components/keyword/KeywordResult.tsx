
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ResourceResultDisplay } from '../shared/ResourceResultDisplay';
import { KeywordHistoryTable } from './KeywordHistoryTable';
import { useKeywordData } from '@/hooks/useKeywordData';

type KeywordResultProps = {
  result: any;
};

export const KeywordResult = ({ result }: KeywordResultProps) => {
  const { keywords, originalKeyword, hasError } = useKeywordData(result);

  if (!result) {
    return null;
  }

  if (hasError || result.message) {
    return (
      <Alert className="mt-4">
        <AlertTitle>Mensagem</AlertTitle>
        <AlertDescription>{result.message || "Ocorreu um erro ao processar os resultados."}</AlertDescription>
      </Alert>
    );
  }

  if (keywords.length === 0) {
    return (
      <Alert className="mt-4">
        <AlertTitle>Nenhum resultado encontrado</AlertTitle>
        <AlertDescription>
          Não foram encontradas palavras-chave relacionadas. Tente uma palavra-chave diferente.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ResourceResultDisplay title="Palavras-chave Relacionadas">
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Palavras-chave relacionadas a "{originalKeyword}"
        </h4>
        
        <KeywordHistoryTable keywords={keywords} />
      </div>
    </ResourceResultDisplay>
  );
};
