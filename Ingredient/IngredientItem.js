import React from "react";
// Components
import Home from "../Components/Home";

export default function IngredientItem({ recipes }) {
  return (
    <>
      <Home recipes={recipes} />
    </>
  );
}
