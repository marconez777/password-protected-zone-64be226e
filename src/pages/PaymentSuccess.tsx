
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page is now just a redirect to dashboard
const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2">Redirecionando para o dashboard...</span>
    </div>
  );
};

export default PaymentSuccess;
