import React from "react";
// React Router
import { Link, useLocation, useHistory } from "react-router-dom";
// Material UI Components
import {
  Card,
  Container,
  Grid,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  makeStyles,
} from "@material-ui/core";

// Material UI Icons
import { Pageview } from "@material-ui/icons";
// Components
import MealDetails from "./mealDetails";
import NotFound404 from "../NotFound404";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  strMeal: {
    backgroundColor: theme.palette.warning.light,
    paddingRight: theme.spacing(5),
    color: theme.palette.warning.contrastText,
    padding: "0 !important",
  },
  titleButton: {
    color: theme.palette.warning.contrastText,
  },
  categoryAreaBar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    color: theme.palette.warning.main,
    position: "absolute",
    top: 0,
    "& a": {
      cursor: "pointer",
    },
  },
}));

export default function Home({ categoryFilter, onAreaFilter, recipes, error }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  let history = useHistory();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3} justify="center">
          {Boolean(recipes) ? (
            Boolean(recipes.items) ? (
              recipes.items.map((recipe) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  xl={2}
                  key={recipe.idMeal ? recipe.idMeal : recipe.strMeal}
                >
                  <Card className={classes.card}>
                    {recipe.strCategory && recipe.strArea && (
                      <div className={classes.categoryAreaBar}>
                        <Chip
                          onClick={(e) =>
                            categoryFilter(
                              e,
                              false,
                              recipe.strCategory,
                              history
                            )
                          }
                          size="small"
                          label={recipe.strCategory}
                          color="secondary"
                        />
                        <Chip
                          onClick={(e) =>
                            onAreaFilter(e, recipe.strArea, history)
                          }
                          value={recipe.strArea}
                          size="small"
                          label={recipe.strArea}
                          color="primary"
                        />
                      </div>
                    )}

                    <CardMedia
                      className={classes.media}
                      image={recipe.strMealThumb}
                      title={recipe.strMeal}
                    />
                    <CardContent className={classes.strMeal}>
                      <Button
                        fullWidth
                        className={classes.titleButton}
                        startIcon={<Pageview />}
                        size="large"
                        component={Link}
                        title={recipe.strMeal}
                        onClick={() => history.push(`/meal/${recipe.idMeal}`)}
                      >
                        <Typography component="span" noWrap>
                          {recipe.strMeal}
                        </Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <NotFound404 />
            )
          ) : (
            <NotFound404 />
          )}
        </Grid>
      </Container>
      {/* RANDOM LOOKUP */}
      {"/" === pathname && (
        <MealDetails random={Boolean(recipes.items) ? true : false} />
      )}
    </>
  );
}
