import React, { useState, useEffect } from "react";
// Router
import { Link, useParams, useHistory } from "react-router-dom";
// Material UI Components
import {
  Card,
  withStyles,
  makeStyles,
  Hidden,
  MenuList,
  MenuItem,
  CardHeader,
  Container,
  Grid,
  CardContent,
  CardMedia,
  Button,
  Typography,
  LinearProgress,
  Backdrop,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
// Material UI ICONS
import CategoryIcon from "@material-ui/icons/Category";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ExploreIcon from "@material-ui/icons/Explore";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Visibility, Close } from "@material-ui/icons";
// 3rd party helper components
import Image from "material-ui-image";
import NotFound404 from "../NotFound404";

const useStyles = makeStyles((theme) => ({
  mealThumb: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  mealInfo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    height: "100%",
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  progress: {
    width: "80%",
    margin: "0 auto",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    let: 0,
  },
  tableContainer: {
    position: "relative",
    width: "100%",
    height: 0,
    paddingTop: "56.25%",
    top: 0,
    let: 0,
  },
  card1: {
    position: "relative",
  },
  fullscreenIconBar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    zIndex: 50,
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%" /* 16:9 */,
    height: 0,
    "& iframe": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  recipeInstructions: {
    display: "flex",
  },
  ingredientMenu: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  },
}));

// Customized Table
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function RenderTags({ tags, tagFilter, history }) {
  const arrTags = tags.split(",");
  return (
    <>
      {arrTags.map((tag, i) => (
        <Button
          key={i}
          size="small"
          variant="text"
          color="default"
          onClick={(e) => tagFilter(e, tag, history)}
        >
          {tag}
        </Button>
      ))}
    </>
  );
}
// Table helper function
function createData(ingredient, measure) {
  return { ingredient, measure };
}

export default function MealDetails({
  categoryFilter,
  onAreaFilter,
  tagFilter,
  handleClickIngredient,
  random,
}) {
  const classes = useStyles();
  const { id } = useParams();
  let history = useHistory();
  // STATE
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [meal, setMeal] = useState({});
  const [fullscreen, setFullscreen] = useState(false);
  const [openYT, setOpenYT] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { strYoutube, strInstructions } = meal;
  const [serverError, setServerError] = useState(null);
  // EFFECt
  useEffect(() => {
    setTimeout(() => {
      setShowImage(true);
    }, 500);
    fetchMeal();
  }, []);
  // FETCH MEALS
  const fetchMeal = async () => {
    let data;
    try {
      data = await fetch(
        id
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.themealdb.com/api/json/v1/1/random.php`
      );
    } catch (error) {
      setBackdropOpen(false);
      return setServerError(error);
    }
    if (!data.ok) {
      setBackdropOpen(false);
      return setServerError(data);
    }
    const mealData = await data.json();
    setMeal(mealData.meals[0]);
    setBackdropOpen(false);
  };
  // FULLSCREEN
  const handleCloseFullscreen = () => setFullscreen(false);
  const handleOpenFullscreen = () => setFullscreen(true);
  // YOUTUBE DIALOG
  const handleOpenYT = () => setOpenYT(true);
  const handleCloseYT = () => setOpenYT(false);

  const rows = [
    createData(meal.strIngredient1, meal.strMeasure1),
    createData(meal.strIngredient2, meal.strMeasure2),
    createData(meal.strIngredient3, meal.strMeasure3),
    createData(meal.strIngredient4, meal.strMeasure4),
    createData(meal.strIngredient5, meal.strMeasure5),
    createData(meal.strIngredient6, meal.strMeasure6),
    createData(meal.strIngredient7, meal.strMeasure7),
    createData(meal.strIngredient8, meal.strMeasure8),
    createData(meal.strIngredient9, meal.strMeasure9),
    createData(meal.strIngredient10, meal.strMeasure10),
    createData(meal.strIngredient11, meal.strMeasure11),
    createData(meal.strIngredient12, meal.strMeasure12),
    createData(meal.strIngredient13, meal.strMeasure13),
    createData(meal.strIngredient14, meal.strMeasure14),
    createData(meal.strIngredient15, meal.strMeasure15),
    createData(meal.strIngredient16, meal.strMeasure16),
    createData(meal.strIngredient17, meal.strMeasure17),
    createData(meal.strIngredient18, meal.strMeasure18),
    createData(meal.strIngredient19, meal.strMeasure19),
    createData(meal.strIngredient20, meal.strMeasure20),
  ];

  if (random === false) {
    return null;
  }

  if (serverError) {
    return <NotFound404 error={serverError} />;
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={0}>
          {random === true && (
            <Grid item xs={12}>
              <Box py={6}>
                <Typography variant="h4" color="initial" noWrap>
                  Random Lookup
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Card className={classes.card1}>
              <CardMedia
                className={classes.mealThumb}
                title={meal.strMeal}
                alt={meal.strMeal}
                image={meal.strMealThumb}
              />
              {/* YouTube and Full screen Button */}
              <div className={classes.fullscreenIconBar}>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  color="secondary"
                  size="small"
                  component={Link}
                  endIcon={<YouTubeIcon />}
                  onClick={handleOpenYT}
                >
                  on
                </Button>
                <IconButton
                  aria-label="Full screen"
                  onClick={handleOpenFullscreen}
                >
                  <FullscreenIcon />
                </IconButton>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* =========== TABLE ============ */}
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">Ingredients</StyledTableCell>
                    <StyledTableCell align="left">Measurements</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(
                    (row, i) =>
                      row.ingredient && (
                        <StyledTableRow key={i}>
                          <StyledTableCell align="right">
                            {row.ingredient}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.measure}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box mt={4}>
              <Paper style={{ paddingLeft: 16 }} elevation={3}>
                <Button
                  variant="text"
                  color="default"
                  startIcon={<ExploreIcon />}
                  title="Area"
                  onClick={(e) => {
                    onAreaFilter(e, meal.strArea);
                  }}
                >
                  {meal.strArea}
                </Button>
                <Button
                  variant="text"
                  startIcon={<CategoryIcon />}
                  color="default"
                  onClick={(e) => {
                    categoryFilter(e, false, meal.strCategory);
                  }}
                >
                  {meal.strCategory}
                </Button>
                {meal.strTags && (
                  <Typography component="span">
                    <IconButton aria-label="Icon">
                      <LocalOfferIcon />
                    </IconButton>
                    <RenderTags
                      tags={` ${meal.strTags}`}
                      tagFilter={tagFilter}
                      history={history}
                    />
                  </Typography>
                )}
              </Paper>
            </Box>
            <Card>
              <CardHeader title={meal.strMeal} />
              <CardContent className={classes.recipeInstructions}>
                <Box mr={2}>
                  <Typography
                    component="p"
                    style={{
                      maxWidth: 650,
                      textAlign: "justify",
                    }}
                  >
                    {strInstructions}
                  </Typography>
                  <Hidden smUp>
                    <Box mt={3}>
                      <MenuList className={classes.ingredientMenu}>
                        {rows.map(
                          ({ ingredient }, i) =>
                            ingredient && (
                              <MenuItem
                                key={i}
                                onClick={(e) =>
                                  handleClickIngredient(ingredient, history)
                                }
                                fullWidth
                              >
                                {ingredient}
                              </MenuItem>
                            )
                        )}
                      </MenuList>
                    </Box>
                  </Hidden>
                </Box>
                <Hidden smDown>
                  <Box p={2} pt={0}>
                    <MenuList className={classes.ingredientMenu}>
                      {rows.map(
                        ({ ingredient }) =>
                          ingredient && (
                            <MenuItem
                              key={ingredient}
                              onClick={(e) =>
                                handleClickIngredient(ingredient, history)
                              }
                            >
                              {ingredient}
                            </MenuItem>
                          )
                      )}
                    </MenuList>
                  </Box>
                </Hidden>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* ========= BACKDROP ========= */}
      {random !== true && (
        <Backdrop className={classes.backdrop} open={backdropOpen}>
          <div className={classes.progress}>
            <LinearProgress />
            <LinearProgress color="secondary" />
          </div>
        </Backdrop>
      )}
      {/* ========= DIALOG Fullscreen ========= */}
      <Dialog
        fullScreen
        open={fullscreen}
        onClose={handleCloseFullscreen}
        aria-labelledby={meal.strMeal}
      >
        <DialogActions>
          <IconButton onClick={handleCloseFullscreen} color="secondary">
            <Close />
          </IconButton>
        </DialogActions>
        <DialogTitle id={meal.strMeal}>{meal.strMeal} </DialogTitle>
        <DialogContent>
          <Image
            src={showImage ? meal.strMealThumb : ""}
            title={meal.strMeal}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseFullscreen}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openYT}
        onClose={handleCloseYT}
        aria-labelledby={meal.strMeal}
      >
        <DialogTitle id={meal.strMeal}>{meal.strMeal} </DialogTitle>
        <DialogContent>
          <div className={classes.videoWrapper}>
            <iframe
              title={meal.strMeal}
              type="text/html"
              src={
                strYoutube
                  ? strYoutube.replace("watch?v=", "embed/")
                  : strYoutube
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseYT} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
