
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { TextoSEOBlogForm } from "../components/texto-seo-blog/TextoSEOBlogForm";

const TextoSEOBlog = () => {
  return (
    <DashboardLayout 
      title="Texto SEO para Blog" 
      subtitle="Gere textos otimizados para SEO de blogs"
    >
      <TextoSEOBlogForm />
    </DashboardLayout>
  );
};

export default TextoSEOBlog;
