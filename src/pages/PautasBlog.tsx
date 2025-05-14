
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PautasBlogForm } from "@/components/pautas-blog/PautasBlogForm";

const PautasBlog = () => {
  return (
    <DashboardLayout 
      title="Pautas para Blog" 
      subtitle="Gere ideias de conteúdo para seu blog"
    >
      <PautasBlogForm />
    </DashboardLayout>
  );
};

export default PautasBlog;
