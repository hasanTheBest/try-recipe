import React, { useEffect, useState } from "react";
// Router
import { useHistory } from "react-router-dom";
// Material UI Components
import { Grid, Box, Container, Fab } from "@material-ui/core";
import spacing from "@material-ui/system";

export default function Area({ clickArea }) {
  let history = useHistory();
  // STATE
  const [areas, setAreas] = useState([]);
  // EFFECT
  useEffect(() => {
    !localStorage.getItem("recipeAreas")
      ? fetchAreas()
      : setAreas(JSON.parse(localStorage.getItem("recipeAreas")).meals);
  }, []);

  const fetchAreas = async () => {
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const Obj = await data.json();
    setAreas(Obj.meals);
    localStorage.setItem("recipeAreas", JSON.stringify(Obj));
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container justify="center">
          {areas.map(({ strArea }) => (
            <Box p={1} item>
              <Fab
                key={strArea}
                variant="extended"
                onClick={(e) => clickArea(e, strArea, history)}
              >
                {strArea}
              </Fab>
            </Box>
          ))}
        </Grid>
      </Container>
    </>
  );
}
