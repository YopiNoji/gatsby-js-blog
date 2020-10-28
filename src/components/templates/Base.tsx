import React from "react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

type PropsType = {
  children: React.ReactNode;
};

const Base: React.FC<PropsType> = (props) => {
  return (
    <div className="min-h-screen m-12">
      <Header />
      <div className="container mx-auto my-12">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Base;
