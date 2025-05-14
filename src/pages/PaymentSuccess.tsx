
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard immediately
    navigate("/dashboard");
  }, [navigate]);

  // This is just a placeholder as the component will redirect immediately
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-2">Redirecionando para o dashboard...</span>
    </div>
  );
};

export default PaymentSuccess;
