import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Layout = (props) => {
  return (
    <div>
      <Header />

      <main style={{ minHeight: "70vh" }}>{props.children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
