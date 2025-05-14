
import { useState } from "react";
import { Loader2, RefreshCcw, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ActiveSubscriptionCardProps {
  usage: number;
  limit: number;
  remainingUses: number;
  endsAt: string | null;
  usagePercentage: number;
  error: string | null;
  isLoading: boolean;
  onRenew: () => Promise<void>;
  onRefreshStatus: () => Promise<void>;
}

export const ActiveSubscriptionCard = ({
  usage,
  limit,
  remainingUses,
  endsAt,
  usagePercentage,
  error,
  isLoading,
  onRenew,
  onRefreshStatus
}: ActiveSubscriptionCardProps) => {
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="mb-8 border-green-500 shadow-md">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-800">Assinatura Ativa</CardTitle>
            <CardDescription>Seu plano está ativo até {formatDate(endsAt)}</CardDescription>
          </div>
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Uso da Assinatura</h3>
              <span className="text-sm">{usage} de {limit} requisições ({usagePercentage}%)</span>
            </div>
            <Progress 
              value={usagePercentage} 
              className={`h-2 ${usagePercentage > 80 ? 'bg-red-100' : 'bg-gray-100'}`} 
            />
            <div className="mt-1 text-sm text-gray-500 flex justify-between">
              <span>{remainingUses} requisições restantes</span>
              {remainingUses < 20 && (
                <span className="text-amber-600 font-medium">Limite próximo do fim!</span>
              )}
            </div>
          </div>
          
          {remainingUses <= 20 && (
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800">Atenção: Limite próximo do fim</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Você tem apenas {remainingUses} requisições restantes. Considere renovar sua assinatura antecipadamente para evitar interrupções.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Plano:</span>
              <span className="font-medium">Mensal - R$ 97,00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Válido até:</span>
              <span className="font-medium">{formatDate(endsAt)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ativo
              </span>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-end">
        <Button 
          variant="outline" 
          onClick={onRefreshStatus}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aguarde...
            </>
          ) : (
            <>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Atualizar Status
            </>
          )}
        </Button>
        <Button onClick={onRenew} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : "Renovar Assinatura"}
        </Button>
      </CardFooter>
    </Card>
  );
};
