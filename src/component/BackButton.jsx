import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ theme }) => {
  return (
    <Link to="/" className={`inline-flex items-center py-2 px-4 rounded-lg shadow-md transition-colors duration-300 
      ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
      <FaArrowLeft className="mr-2" />
      Back to Home
    </Link>
  );
};

export default BackButton;
