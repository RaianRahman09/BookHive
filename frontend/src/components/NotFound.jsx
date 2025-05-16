import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}