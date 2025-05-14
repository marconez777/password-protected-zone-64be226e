
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  ChevronRight,  
  FileText, 
  Search,
  Users 
} from "lucide-react";

export const FeatureCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card 
        className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleCardClick('/search-funnel')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Funil de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Search className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleCardClick('/market-and-target')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Mercado e Público</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Users className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleCardClick('/keywords')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Palavras Chaves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <BarChart3 className="h-8 w-8 text-mkranker-purple" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleCardClick('/texto-seo-lp')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Texto SEO para LP</CardTitle>
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
