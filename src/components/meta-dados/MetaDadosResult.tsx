
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
  // Se o resultado for null ou undefined, não renderize nada
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

  // Garantir que o título e meta_description sejam strings
  const titulo = typeof result.titulo === 'string' ? result.titulo : '';
  const metaDescription = typeof result.meta_description === 'string' ? result.meta_description : '';
  
  // Garantir que o h1 seja string
  const h1 = result.heading_tags?.h1 || '';
  
  // Garantir que h2 seja um array de strings
  const h2Array = Array.isArray(result.heading_tags?.h2) ? result.heading_tags?.h2 : [];

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-6">
            {titulo && (
              <div>
                <h3 className="text-lg font-medium mb-2">Título da Página</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {titulo}
                </div>
              </div>
            )}
            
            {metaDescription && (
              <div>
                <h3 className="text-lg font-medium mb-2">Meta Description</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {metaDescription}
                </div>
              </div>
            )}
            
            {h1 && (
              <div>
                <h3 className="text-lg font-medium mb-2">H1</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {h1}
                </div>
              </div>
            )}
            
            {h2Array.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">H2</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {h2Array.map((heading, index) => (
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
