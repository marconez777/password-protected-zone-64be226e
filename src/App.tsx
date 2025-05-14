
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { PlanProvider } from "./contexts/PlanContext";
import { ProtectedRoute as AuthRoute } from "./components/ProtectedRoute";
import { ProtectedRoute as SubscriptionRoute } from "./components/auth/ProtectedRoute";
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
              
              {/* Rotas protegidas por autenticação */}
              <Route element={<AuthRoute />}>
                {/* Rotas protegidas por assinatura ativa */}
                <Route path="/dashboard" element={
                  <SubscriptionRoute>
                    <Dashboard />
                  </SubscriptionRoute>
                } />
                <Route path="/funil-de-busca" element={
                  <SubscriptionRoute>
                    <SearchFunnel />
                  </SubscriptionRoute>
                } />
                <Route path="/palavras-chave" element={
                  <SubscriptionRoute>
                    <Keywords />
                  </SubscriptionRoute>
                } />
                <Route path="/mercado-publico-alvo" element={
                  <SubscriptionRoute>
                    <MarketAndTarget />
                  </SubscriptionRoute>
                } />
                <Route path="/texto-seo-lp" element={
                  <SubscriptionRoute>
                    <TextoSEOLP />
                  </SubscriptionRoute>
                } />
                <Route path="/texto-seo-produto" element={
                  <SubscriptionRoute>
                    <TextoSEOProduto />
                  </SubscriptionRoute>
                } />
                <Route path="/texto-seo-blog" element={
                  <SubscriptionRoute>
                    <TextoSEOBlog />
                  </SubscriptionRoute>
                } />
                <Route path="/pautas-blog" element={
                  <SubscriptionRoute>
                    <PautasBlog />
                  </SubscriptionRoute>
                } />
                <Route path="/meta-dados" element={
                  <SubscriptionRoute>
                    <MetaDados />
                  </SubscriptionRoute>
                } />
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
