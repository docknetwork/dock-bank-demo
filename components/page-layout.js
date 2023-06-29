import React from 'react';

import Sidebar from 'components/sidebar';

export default function PageLayout({ title, children }) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        {title && (
          <div className="sticky z-10 top-0 h-13 bg-white lg:py-2.5 px-3 md:lg:xl:px-10">
            <div className="flex items-center justify-between px-6 space-x-4 2xl:container">
              <h5 hidden className="pt-6 pb-4 text-2xl font-medium text-gray-600 lg:block">
                {title}
              </h5>
              <div className="flex space-x-4"></div>
            </div>
          </div>
        )}
        <div className="px-6 pt-6 2xl:container">
          {children}
        </div>
      </div>
    </>
  );
}
