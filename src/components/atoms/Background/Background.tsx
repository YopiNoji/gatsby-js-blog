import React from "react";
import BGAnimation from "./BGAnimation";
const Background: React.FC = ({ children }) => {
  return (
    <>
      <BGAnimation />
      <div className="relative">{children}</div>
    </>
  );
};

export default Background;
