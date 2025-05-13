
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TextoSEOBlogForm } from "@/components/texto-seo-blog/TextoSEOBlogForm";
import { useAuth } from "@/hooks/useAuth";

const TextoSEOBlog = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout 
      title="Texto SEO para Blog" 
      userName={user?.user_metadata?.full_name || "Usuário"}
    >
      <TextoSEOBlogForm />
    </DashboardLayout>
  );
};

export default TextoSEOBlog;
