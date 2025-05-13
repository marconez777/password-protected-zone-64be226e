
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  message?: string;
};

export function MetaDadosResult({ result }: MetaDadosResultProps) {
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

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-6">
            {result.titulo && (
              <div>
                <h3 className="text-lg font-medium mb-2">Título da Página</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {result.titulo}
                </div>
              </div>
            )}
            
            {result.meta_description && (
              <div>
                <h3 className="text-lg font-medium mb-2">Meta Description</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {result.meta_description}
                </div>
              </div>
            )}
            
            {result.heading_tags?.h1 && (
              <div>
                <h3 className="text-lg font-medium mb-2">H1</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {result.heading_tags.h1}
                </div>
              </div>
            )}
            
            {result.heading_tags?.h2 && result.heading_tags.h2.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">H2</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {result.heading_tags.h2.map((heading, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded border">
                      {heading}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
