
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, ProtectedRoute } from "@/providers/auth";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import CadastroEnviado from "@/pages/CadastroEnviado";
import Dashboard from "@/pages/Dashboard";
import SearchFunnel from "@/pages/SearchFunnel";
import Keywords from "@/pages/Keywords";
import MarketAndTarget from "@/pages/MarketAndTarget";
import TextoSEOLP from "@/pages/TextoSEOLP";
import TextoSEOProduto from "@/pages/TextoSEOProduto";
import TextoSEOBlog from "@/pages/TextoSEOBlog";
import PautasBlog from "@/pages/PautasBlog";
import MetaDados from "@/pages/MetaDados";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import RecursosPage from "@/pages/RecursosPage";
import FunilDeBusca from "@/pages/FunilDeBusca";
import KeywordsPublic from "@/pages/KeywordsPublic";
import MarketAndTargetPublic from "@/pages/MarketAndTargetPublic";
import TextoSEOLPPublic from "@/pages/TextoSEOLPPublic";
import TextoSEOProdutoPublic from "@/pages/TextoSEOProdutoPublic";
import TextoSEOBlogPublic from "@/pages/TextoSEOBlogPublic";
import PautasBlogPublic from "@/pages/PautasBlogPublic";
import MetaDadosPublic from "@/pages/MetaDadosPublic";

const App = () => {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-enviado" element={<CadastroEnviado />} />
            <Route path="/recursos" element={<RecursosPage />} />
            
            {/* Institutional Resource Pages - New URL Pattern */}
            <Route path="/recursos/funil-de-busca-com-ia" element={<FunilDeBusca />} />
            <Route path="/recursos/palavras-chave-com-ia" element={<KeywordsPublic />} />
            <Route path="/recursos/mercado-e-publico-alvo-com-ia" element={<MarketAndTargetPublic />} />
            <Route path="/recursos/texto-seo-lp-com-ia" element={<TextoSEOLPPublic />} />
            <Route path="/recursos/texto-seo-produto-com-ia" element={<TextoSEOProdutoPublic />} />
            <Route path="/recursos/texto-seo-blog-com-ia" element={<TextoSEOBlogPublic />} />
            <Route path="/recursos/pautas-blog-com-ia" element={<PautasBlogPublic />} />
            <Route path="/recursos/meta-dados-com-ia" element={<MetaDadosPublic />} />
            
            {/* Protected Routes - Updated tool URL patterns */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/search-funnel-tool" element={<ProtectedRoute><SearchFunnel /></ProtectedRoute>} />
            <Route path="/keywords-tool" element={<ProtectedRoute><Keywords /></ProtectedRoute>} />
            <Route path="/market-and-target-tool" element={<ProtectedRoute><MarketAndTarget /></ProtectedRoute>} />
            <Route path="/texto-seo-lp-tool" element={<ProtectedRoute><TextoSEOLP /></ProtectedRoute>} />
            <Route path="/texto-seo-produto-tool" element={<ProtectedRoute><TextoSEOProduto /></ProtectedRoute>} />
            <Route path="/texto-seo-blog-tool" element={<ProtectedRoute><TextoSEOBlog /></ProtectedRoute>} />
            <Route path="/pautas-blog-tool" element={<ProtectedRoute><PautasBlog /></ProtectedRoute>} />
            <Route path="/meta-dados-tool" element={<ProtectedRoute><MetaDados /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
};

export default App;
