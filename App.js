import React, { useEffect, useState } from "react";
// Router
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Material UI Components
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
// Components
import Nav from "./Navigation/Nav";
import Home from "./Components/Home";
import Meal from "./Components/Meal";
import MealDetails from "./Components/mealDetails";
import Category from "./Category/Category";
import CategoryItem from "./Category/CategoryItem";
import Ingredients from "./Ingredient/Ingredients";
import IngredientItem from "./Ingredient/IngredientItem";
import Area from "./Area/Area";
import AreaItem from "./Area/AreaItem";
import NotFound404 from "./NotFound404";

const styles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function RouterApp() {
  const classes = styles();

  // STATE
  const [serverError, setServerError] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [listCategories, setListCategories] = useState([]);
  const [listAreas, setListAreas] = useState([]);
  const [listIngredients, setListIngredients] = useState([]);
  const [nightMode, setNightMode] = useState(
    localStorage.getItem("nightMode")
      ? Number(localStorage.getItem("nightMode"))
      : 1
  );
  const [recipes, setRecipes] = useState({
    recipeName: "",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?s=beef`,
    items: [],
    tabs: {
      value: "",
    },
  });
  const setList = [setListAreas, setListCategories, setListIngredients];

  // EFFECT
  useEffect(() => {
    ["a", "c", "i"].map((item, i) => {
      !localStorage.getItem(`list_${item}`)
        ? fetchData(item, i)
        : setList[i](JSON.parse(localStorage.getItem(`list_${item}`)).meals);
    });
  }, []);

  // Meals
  useEffect(() => {
    fetchMeals();
  }, [recipes.url]);

  // Fetch List
  const fetchData = async (name, i) => {
    let data;
    try {
      data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?${name}=list`
      );
    } catch (error) {
      setBackdropOpen(false);
      return setServerError(error);
    }
    if (!data.ok) {
      setBackdropOpen(false);
      return setServerError(data);
    }
    const areaObj = await data.json();
    // Store in Local Storage
    if (areaObj.meals !== null) {
      localStorage.setItem(`list_${name}`, JSON.stringify(areaObj));
      setList[i](areaObj.meals);
    }
  };

  // FETCH MEALS
  const fetchMeals = async () => {
    let data;
    try {
      data = await fetch(`${recipes.url}`);
    } catch (error) {
      setBackdropOpen(false);
      return setServerError(error);
    }
    if (!data.ok) {
      setBackdropOpen(false);
      return setServerError(data);
    }
    const mealData = await data.json();
    setRecipes({
      ...recipes,
      items: mealData.meals,
    });

    // Close backdrop
    setBackdropOpen(false);
  };
  // AREA FILTER
  const onChangeAreaFilter = (e, area, navHistory) => {
    setBackdropOpen(!backdropOpen);
    setRecipes({
      ...recipes,
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${
        e.target.value ? e.target.value : area
      }`,
    });
    navHistory.push(`/area/${e.target.value ? e.target.value : area}`);
  };
  // INGREDIENT FILTER
  const handleClickIngredient = (ingredient, navHistory) => {
    setBackdropOpen(!backdropOpen);
    setRecipes({
      ...recipes,
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    });
    navHistory.push(`/ingredients/${ingredient}`);
  };
  // LETTER FILTER
  const handleClickFilterLetter = (letter, navHistory) => {
    setBackdropOpen(!backdropOpen);
    setRecipes({
      ...recipes,
      url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
    });
    navHistory.push(`/`);
  };
  // CATEGORY FILTER
  const onChangeCategoryFilter = (value, filterTerm, navHistory) => {
    setBackdropOpen(!backdropOpen);
    setRecipes({
      ...recipes,
      tabs: {
        ...recipes.tabs,
        value: value ? value : filterTerm,
      },
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${
        value ? value : filterTerm
      }`,
    });
    navHistory.push(`/category/${value ? value : filterTerm}`);
  };
  const handleSearchChange = (e) => {
    setRecipes({
      ...recipes,
      recipeName: e.target.value,
    });
  };
  const handleSearchSubmit = (e, tag, navHistory) => {
    e.preventDefault();
    setBackdropOpen(true);
    setRecipes({
      ...recipes,
      url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${
        recipes.recipeName ? recipes.recipeName : tag
      }`,
    });
    navHistory.push("/");
  };
  // BACKDROP
  const handleCloseBackdrop = () => setBackdropOpen(false);
  //  Night Mode
  const handleChangeSwitch = () => {
    setNightMode(Number(Boolean(!Number(nightMode))));
    localStorage.setItem("nightMode", nightMode);
  };
  const themeDark = createMuiTheme({
    palette: {
      type: Boolean(Number(localStorage.getItem("nightMode")))
        ? "light"
        : "dark",
    },
  });

  if (serverError) {
    return <NotFound404 error={serverError} />;
  }
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <BrowserRouter>
        <Route path="/">
          <Nav
            handleSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            onAreaFilter={onChangeAreaFilter}
            categoryFilter={onChangeCategoryFilter}
            handleClickFilterLetter={handleClickFilterLetter}
            handleClickIngredient={handleClickIngredient}
            tabs={recipes.tabs}
            listAreas={listAreas}
            listCategories={listCategories}
            listIngredients={listIngredients}
            handleChangeSwitch={handleChangeSwitch}
            nightMode={nightMode}
          />
        </Route>
        <Switch>
          <Route exact path="/">
            <Home
              categoryFilter={onChangeCategoryFilter}
              onAreaFilter={onChangeAreaFilter}
              recipes={recipes}
              error={serverError}
            />
          </Route>
          <Route exact path="/meal">
            <Meal recipes={recipes} />
          </Route>
          <Route path="/meal/:id">
            <MealDetails
              categoryFilter={onChangeCategoryFilter}
              onAreaFilter={onChangeAreaFilter}
              tagFilter={handleSearchSubmit}
              handleClickIngredient={handleClickIngredient}
            />
          </Route>
          <Route exact path="/category">
            <Category clickCategory={onChangeCategoryFilter} />
          </Route>
          <Route exact path="/area">
            <Area clickArea={onChangeAreaFilter} />
          </Route>
          <Route exact path="/ingredients">
            <Ingredients
              ingredients={listIngredients}
              handleClickIngredient={handleClickIngredient}
            />
          </Route>
          <Route exact path="/ingredients/:ingredientName">
            <IngredientItem recipes={recipes} />
          </Route>
          <Route exact path="/area/:areaName">
            <AreaItem recipes={recipes} />
          </Route>
          <Route exact path="/category/:categoryName">
            <CategoryItem recipes={recipes} />
          </Route>
          <Route>
            <NotFound404 closeBackdrop={handleCloseBackdrop} />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* BACKDROP */}
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </ThemeProvider>
  );
}
