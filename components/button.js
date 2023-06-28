import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({ className, disabled, children, ...props }) {
  const disabledClasses = 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center';
  const defaultClasses = 'py-2 px-4 mt-5 mb-2 font-semibold text-white transition-all bg-blue-600 rounded hover:bg-blue-700 hover:-translate-y-1 duration-250';

  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(disabled ? disabledClasses : defaultClasses, className)}
    >
      {children}
    </button>
  );
}
