
import React from 'react';
import { Link } from 'react-router-dom';

interface RecursoBreadcrumbProps {
  currentPage: string;
}

const RecursoBreadcrumb: React.FC<RecursoBreadcrumbProps> = ({ currentPage }) => {
  return (
    <div className="text-sm text-gray-400 mb-8">
      <Link to="/" className="hover:text-white">Home</Link> {" > "} 
      <Link to="/recursos" className="hover:text-white">recursos</Link> {" > "} 
      <span className="text-white">{currentPage}</span>
    </div>
  );
};

export default RecursoBreadcrumb;
