
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceResultDisplay } from "@/components/shared/ResourceResultDisplay";

type PautasResult = {
  pautas?: string[];
  message?: string;
};

export function PautasBlogResult({ result }: { result: PautasResult | null }) {
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

  // Se não tiver pautas para mostrar
  if (!result.pautas || result.pautas.length === 0) {
    return null;
  }

  return (
    <ResourceResultDisplay title="Ideias de Pautas Geradas">
      <div className="bg-white rounded-lg p-4">
        <ul className="list-disc pl-5 space-y-2">
          {result.pautas.map((pauta, index) => (
            <li key={index} className="text-gray-800">{pauta}</li>
          ))}
        </ul>
      </div>
    </ResourceResultDisplay>
  );
}
