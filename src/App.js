import React from "react";
import DepartureBoard from "./DepartureBoard/departureBoard";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        display: "flex",
        padding: "10px",
      }}
    >
      <DepartureBoard />
    </div>
  );
};

export default App;
