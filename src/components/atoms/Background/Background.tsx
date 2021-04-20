import React from "react";
import BGAnimation from "./BGAnimation";
const Background: React.FC = ({ children }) => {
  return (
    <>
      <div className="fixed w-full h-full bg-white dark:bg-black transition duration-500 ease-in-out">
        <div className="absolute opacity-50 -bottom-3/4 w-6/12 h-full animate-float bg-gradient-to-r from-gray-700 dark:from-gray-300" />
        <BGAnimation />
      </div>
      <div className="relative">{children}</div>
    </>
  );
};

export default Background;
