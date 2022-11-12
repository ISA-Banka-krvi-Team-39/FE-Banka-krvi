import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="bg-gray-800 h-full min-h-screen">
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
