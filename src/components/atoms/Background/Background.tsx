import React from "react";

const Background: React.FC = ({ children }) => {
  return (
    <>
      <div className="fixed w-full h-full bg-white dark:bg-black transition duration-500 ease-in-out">
        <div className="absolute opacity-50 -bottom-3/4 w-6/12 h-full animate-float bg-gradient-to-r from-gray-700 dark:from-gray-300 transform rotate-45" />
        <div className="absolute opacity-75 w-over h-full bg-gradient-to-r from-transparent to-gray-700 dark:to-gray-300 transform rotate-45" />
      </div>
      <div className="relative">{children}</div>
    </>
  );
};

export default Background;
