import React, { useContext } from "react";
import { AppContext } from "../context/userContext";

export const Alerts = () => {
  const { state } = useContext(AppContext);
  return (
    <div
      style={{
        display: state.error || state.message ? "block" : "none",
        position: "fixed",
        top: "25px",
        padding: "5px 10px",
        backgroundColor: "#ebedeb",
        right: "25px",
      }}
    >
      {state.error && <div style={{ color: "red" }}>{state.error}</div>}

      {state.message && <div style={{ color: "green" }}>{state.message}</div>}
    </div>
  );
};
