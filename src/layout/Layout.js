import React from "react";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
export default function Layout(props) {
  return (
    <div>
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
}
