
import React from 'react';
import { AnalysisSection } from './AnalysisSection';

interface CompleteAnalysisTabProps {
  mercado?: string;
  publico?: string;
  recomendacoes?: string;
}

export function CompleteAnalysisTab({ mercado, publico, recomendacoes }: CompleteAnalysisTabProps) {
  return (
    <div className="space-y-6">
      {mercado && <AnalysisSection title="Análise de Mercado" content={mercado} />}
      {publico && <AnalysisSection title="Público-Alvo" content={publico} />}
      {recomendacoes && <AnalysisSection title="Recomendações" content={recomendacoes} />}
    </div>
  );
}
