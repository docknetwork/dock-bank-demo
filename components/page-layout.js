import React from 'react';

export default function PageLayout({ children }) {
  return (
    <div className="flex flex-col items-center w-full h-screen max-w-6xl mx-auto mt-16 space-y-8 bg-white">
      {children}
    </div>
  );
}
