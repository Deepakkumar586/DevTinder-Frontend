// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#8B5CF6] to-[#8B5CF6]">
          404
        </h1>
        <p className="text-xl text-[#A0A0B0] mt-4 mb-8">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-lg text-white bg-linear-to-r from-[#8B5CF6] to-[#8B5CF6] hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;