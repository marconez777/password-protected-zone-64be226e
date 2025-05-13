
import { Card, CardContent } from "@/components/ui/card";

interface MarketTargetResultProps {
  result: any;
}

export function MarketTargetResult({ result }: MarketTargetResultProps) {
  if (!result) return null;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Resultado:</h3>
        
        {result.message ? (
          <p className="text-gray-700">{result.message}</p>
        ) : (
          <div className="space-y-6">
            {result.mercado && (
              <div>
                <h4 className="text-lg font-medium text-mkranker-purple mb-2">Análise de Mercado:</h4>
                <p className="whitespace-pre-wrap">{result.mercado}</p>
              </div>
            )}
            
            {result.publico && (
              <div>
                <h4 className="text-lg font-medium text-mkranker-purple mb-2">Público-Alvo:</h4>
                <p className="whitespace-pre-wrap">{result.publico}</p>
              </div>
            )}
            
            {result.recomendacoes && (
              <div>
                <h4 className="text-lg font-medium text-mkranker-purple mb-2">Recomendações:</h4>
                <p className="whitespace-pre-wrap">{result.recomendacoes}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
