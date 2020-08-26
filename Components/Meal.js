import React from "react";
import Home from "./Home";

export default function Meal({ recipes }) {
  return (
    <>
      <Home recipes={recipes} />
    </>
  );
}
