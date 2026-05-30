import React from "react";
import { useEffect, useState } from "react";

const ErrorComp = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // role='alert'
      className={`transition-all opacity-100 alert flex alert-error absolute left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden 
      ${isVisible ? " top-1/4 " : " -top-40 "} w-max max-w-[60%] z-20 `}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='stroke-current shrink-0 h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default ErrorComp;
