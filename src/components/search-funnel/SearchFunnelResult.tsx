
import React from 'react';

interface SearchFunnelResultProps {
  result: any;
}

export function SearchFunnelResult({ result }: SearchFunnelResultProps) {
  if (!result) return null;
  
  try {
    return (
      <div className="mt-4 space-y-4">
        <h3 className="text-lg font-bold">Resultado do Funil de Busca</h3>
        <div className="whitespace-pre-wrap bg-muted p-4 rounded-md overflow-auto max-h-[500px]">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      </div>
    );
  } catch (error) {
    return <div className="text-destructive">Erro ao exibir resultado.</div>;
  }
}
