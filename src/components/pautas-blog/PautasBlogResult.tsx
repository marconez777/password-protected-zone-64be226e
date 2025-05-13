
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <Card>
        <CardContent className="p-4">
          <div className="text-amber-600">
            {result.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Se não tiver pautas para mostrar
  if (!result.pautas || result.pautas.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="max-h-[400px]">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ideias de Pautas Geradas</h2>
            <ul className="list-disc pl-5 space-y-2">
              {result.pautas.map((pauta, index) => (
                <li key={index} className="text-gray-800">{pauta}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
