
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { PlanProvider } from "./contexts/PlanContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Subscribe from "./pages/Subscribe";
import Dashboard from "./pages/Dashboard";
import SearchFunnel from "./pages/SearchFunnel";
import Keywords from "./pages/Keywords";
import MarketAndTarget from "./pages/MarketAndTarget";
import TextoSEOLP from "./pages/TextoSEOLP";
import TextoSEOProduto from "./pages/TextoSEOProduto";
import TextoSEOBlog from "./pages/TextoSEOBlog";
import PautasBlog from "./pages/PautasBlog";
import MetaDados from "./pages/MetaDados";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PlanProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-success" element={<RegisterSuccess />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/subscribe" element={<Subscribe />} />
              
              {/* Rotas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/funil-de-busca" element={<SearchFunnel />} />
                <Route path="/palavras-chave" element={<Keywords />} />
                <Route path="/mercado-publico-alvo" element={<MarketAndTarget />} />
                <Route path="/texto-seo-lp" element={<TextoSEOLP />} />
                <Route path="/texto-seo-produto" element={<TextoSEOProduto />} />
                <Route path="/texto-seo-blog" element={<TextoSEOBlog />} />
                <Route path="/pautas-blog" element={<PautasBlog />} />
                <Route path="/meta-dados" element={<MetaDados />} />
              </Route>
              
              {/* Rota de fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PlanProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
