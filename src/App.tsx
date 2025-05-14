// App.tsx com roteamento corrigido
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { PlanProvider } from "./contexts/PlanContext";
import { ProtectedRoute } from "./components/ProtectedRoute";  // Usar apenas um arquivo
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
              {/* Rotas públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-success" element={<RegisterSuccess />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              
              {/* Rota para subscription - requer apenas autenticação */}
              <Route path="/subscribe" element={
                <ProtectedRoute>
                  <Subscribe />
                </ProtectedRoute>
              } />
              
              {/* Dashboard - requer apenas autenticação (permite upgrade) */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Recursos - requerem autenticação E assinatura ativa */}
              <Route path="/funil-de-busca" element={
                <ProtectedRoute requireSubscription={true}>
                  <SearchFunnel />
                </ProtectedRoute>
              } />
              <Route path="/palavras-chave" element={
                <ProtectedRoute requireSubscription={true}>
                  <Keywords />
                </ProtectedRoute>
              } />
              <Route path="/mercado-publico-alvo" element={
                <ProtectedRoute requireSubscription={true}>
                  <MarketAndTarget />
                </ProtectedRoute>
              } />
              <Route path="/texto-seo-lp" element={
                <ProtectedRoute requireSubscription={true}>
                  <TextoSEOLP />
                </ProtectedRoute>
              } />
              <Route path="/texto-seo-produto" element={
                <ProtectedRoute requireSubscription={true}>
                  <TextoSEOProduto />
                </ProtectedRoute>
              } />
              <Route path="/texto-seo-blog" element={
                <ProtectedRoute requireSubscription={true}>
                  <TextoSEOBlog />
                </ProtectedRoute>
              } />
              <Route path="/pautas-blog" element={
                <ProtectedRoute requireSubscription={true}>
                  <PautasBlog />
                </ProtectedRoute>
              } />
              <Route path="/meta-dados" element={
                <ProtectedRoute requireSubscription={true}>
                  <MetaDados />
                </ProtectedRoute>
              } />
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PlanProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
