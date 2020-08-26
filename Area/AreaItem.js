import React from "react";
// Components
import Home from "../Components/Home";

export default function AreaItem({ recipes }) {
  return (
    <>
      <Home recipes={recipes} />
    </>
  );
}
