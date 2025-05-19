
import React from 'react';
import { Link } from 'react-router-dom';

interface RecursoBreadcrumbProps {
  currentPage: string;
}

const RecursoBreadcrumb: React.FC<RecursoBreadcrumbProps> = ({ currentPage }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8">
      <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex flex-wrap">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="inline-flex items-center">
          <Link to="/" className="hover:text-white" itemProp="item">
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
          <span className="mx-2">{" > "}</span>
        </li>
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="inline-flex items-center">
          <Link to="/recursos" className="hover:text-white" itemProp="item">
            <span itemProp="name">recursos</span>
          </Link>
          <meta itemProp="position" content="2" />
          <span className="mx-2">{" > "}</span>
        </li>
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="text-white">
          <span itemProp="name">{currentPage}</span>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </nav>
  );
};

export default RecursoBreadcrumb;
