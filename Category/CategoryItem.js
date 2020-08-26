import React from "react";
// Components
import Home from "../Components/Home";

export default function CategoryItem({ recipes }) {
  return (
    <>
      <Home recipes={recipes} />
    </>
  );
}
