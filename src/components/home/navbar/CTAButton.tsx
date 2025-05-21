
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/auth';

const CTAButton: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="mr-[10%] hidden md:block">
      {user ? (
        <Link
          to="/dashboard"
          className="border border-[#805af5] text-white rounded-md px-6 py-2 hover:bg-[#805af5]/20 transition"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          to="/cadastro"
          className="border border-[#805af5] text-white rounded-md px-6 py-2 hover:bg-[#805af5]/20 transition"
        >
          Assinar
        </Link>
      )}
    </div>
  );
};

export default CTAButton;
