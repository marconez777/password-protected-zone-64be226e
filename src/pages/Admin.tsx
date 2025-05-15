
import { UserApprovalPanel } from "@/components/admin/UserApprovalPanel";
import { Separator } from "@/components/ui/separator";

const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Painel de Administração</h1>
      <Separator className="my-6" />
      
      <UserApprovalPanel />
    </div>
  );
};

export default Admin;
