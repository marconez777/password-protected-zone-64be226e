import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import SearchFunnel from "@/pages/SearchFunnel";
import Keywords from "@/pages/Keywords";
import MarketAndTarget from "@/pages/MarketAndTarget";
import TextoSEOLP from "@/pages/TextoSEOLP";
import TextoSEOProduto from "@/pages/TextoSEOProduto";
import TextoSEOBlog from "@/pages/TextoSEOBlog";
import PautasBlog from "@/pages/PautasBlog";
import MetaDados from "@/pages/MetaDados";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-funnel" element={<SearchFunnel />} />
        <Route path="/keywords" element={<Keywords />} />
        <Route path="/market-and-target" element={<MarketAndTarget />} />
        <Route path="/texto-seo-lp" element={<TextoSEOLP />} />
        <Route path="/texto-seo-produto" element={<TextoSEOProduto />} />
        <Route path="/texto-seo-blog" element={<TextoSEOBlog />} />
        <Route path="/pautas-blog" element={<PautasBlog />} />
        <Route path="/meta-dados" element={<MetaDados />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
