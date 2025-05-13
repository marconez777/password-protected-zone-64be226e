
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  ChevronRight,  
  FileText, 
  Search,
  Users,
  Lock 
} from "lucide-react";
import { useUsageData } from "@/hooks/useUsageData";
import { useToast } from "@/hooks/use-toast";

export const FeatureCards = () => {
  const navigate = useNavigate();
  const { subscription } = useUsageData();
  const { toast } = useToast();

  const handleCardClick = (route: string) => {
    if (subscription?.is_active) {
      navigate(route);
    } else {
      toast({
        title: "Assinatura necessária",
        description: "Você precisa ter uma assinatura ativa para acessar esta funcionalidade.",
        variant: "destructive",
      });
      navigate("/subscribe");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card 
        className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${!subscription?.is_active ? 'opacity-75' : ''}`}
        onClick={() => handleCardClick('/funil-de-busca')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
            <span>Funil de Busca</span>
            {!subscription?.is_active && <Lock className="h-4 w-4 text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Search className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${!subscription?.is_active ? 'opacity-75' : ''}`}
        onClick={() => handleCardClick('/mercado-publico-alvo')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
            <span>Mercado e Público</span>
            {!subscription?.is_active && <Lock className="h-4 w-4 text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Users className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${!subscription?.is_active ? 'opacity-75' : ''}`}
        onClick={() => handleCardClick('/palavras-chave')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
            <span>Palavras Chaves</span>
            {!subscription?.is_active && <Lock className="h-4 w-4 text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <BarChart3 className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={`border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${!subscription?.is_active ? 'opacity-75' : ''}`}
        onClick={() => handleCardClick('/texto-seo-lp')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
            <span>Texto SEO para LP</span>
            {!subscription?.is_active && <Lock className="h-4 w-4 text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <FileText className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
