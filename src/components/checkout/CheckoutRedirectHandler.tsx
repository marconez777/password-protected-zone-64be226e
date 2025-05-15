
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface CheckoutRedirectHandlerProps {
  redirectUrl: string;
}

const CheckoutRedirectHandler = ({ redirectUrl }: CheckoutRedirectHandlerProps) => {
  useEffect(() => {
    // Redirect after a small delay to ensure the component is mounted
    const redirectTimer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 500);
    
    // Clear timeout if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [redirectUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-12 w-12 animate-spin text-mkranker-purple mb-4" />
      <p className="text-lg text-gray-700 font-medium">
        Redirecionando para o Mercado Pago...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Por favor, aguarde. Você será direcionado automaticamente.
      </p>
    </div>
  );
};

export default CheckoutRedirectHandler;
