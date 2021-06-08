import React from "react";
import { Container } from "react-bootstrap";
import "./nav.css";

export default function Footer() {
  return (
    <Container
      fluid
      className="footerStyle"

      // style={{
      //   // textAlign: "center",
      //   padding: "20px 60px",
      //   background: "rgb(214, 211, 211)",
      // }}
    >
      Copyright @2020-2021 Sabka Bazar Grocery Supplies PVT. LTD
    </Container>
  );
}
