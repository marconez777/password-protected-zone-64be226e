
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSyncUsers } from "@/hooks/useSyncUsers";
import { useState } from "react";

export const SyncUsersButton = () => {
  const { syncUsers, isLoading, results } = useSyncUsers();
  const [showResults, setShowResults] = useState(false);

  const handleSync = async () => {
    setShowResults(true);
    await syncUsers();
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleSync} 
        disabled={isLoading}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sincronizando Usuários...
          </>
        ) : (
          "Sincronizar Usuários Pendentes"
        )}
      </Button>
      
      {showResults && results.length > 0 && (
        <div className="mt-4 border rounded-md p-4 bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Resultados da Sincronização</h3>
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li 
                key={index} 
                className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                <span className="font-medium">{result.email}:</span> {result.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
