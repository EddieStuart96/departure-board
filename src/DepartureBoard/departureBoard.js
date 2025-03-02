import React from "react";
import { useFlightsForToday } from "../hooks/useFlightStatus.js";

const DepartureBoard = () => {
  const { data, loading, error } = useFlightsForToday("JFK");
  console.log("🚀🚀🚀", data);
  return (
    <div
      style={{
        display: "flex",
        height: "80%",
        width: "50%",
        justifyContent: "center",
        borderStyle: "groove",
        borderColor: "#000000",
      }}
    >
      <h1>Hello, worrrrrrld!</h1>
    </div>
  );
};

export default DepartureBoard;
