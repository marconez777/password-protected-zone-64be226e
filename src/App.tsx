
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, ProtectedRoute } from "@/providers/AuthProvider";

import Index from "@/pages/Index";
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

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-enviado" element={<CadastroEnviado />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/search-funnel" element={<ProtectedRoute><SearchFunnel /></ProtectedRoute>} />
          <Route path="/keywords" element={<ProtectedRoute><Keywords /></ProtectedRoute>} />
          <Route path="/market-and-target" element={<ProtectedRoute><MarketAndTarget /></ProtectedRoute>} />
          <Route path="/texto-seo-lp" element={<ProtectedRoute><TextoSEOLP /></ProtectedRoute>} />
          <Route path="/texto-seo-produto" element={<ProtectedRoute><TextoSEOProduto /></ProtectedRoute>} />
          <Route path="/texto-seo-blog" element={<ProtectedRoute><TextoSEOBlog /></ProtectedRoute>} />
          <Route path="/pautas-blog" element={<ProtectedRoute><PautasBlog /></ProtectedRoute>} />
          <Route path="/meta-dados" element={<ProtectedRoute><MetaDados /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
