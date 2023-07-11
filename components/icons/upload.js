import React from 'react';

const Upload = ({ width = 20, height = 20, onClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    onClick={onClick}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    ></path>
  </svg>
);

export default Upload;
