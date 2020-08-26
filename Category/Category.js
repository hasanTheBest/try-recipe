import React, { useState, useEffect } from "react";
// Router
import { useHistory } from "react-router-dom";
// Material UI Components
import {
  makeStyles,
  Container,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from "@material-ui/core";
// Material UI Icons
import WallpaperIcon from "@material-ui/icons/Wallpaper";

// Components
import DialogDescription from "../Components/DialogDescription";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardActions: {
    padding: 0,
    backgroundColor: theme.palette.warning.light,
    justifyContent: "space-between",
    "& button, & a": {
      color: theme.palette.warning.contrastText,
      fontSize: "1rem",
      textDecoration: "none",
    },
  },
}));

export default function Category({ clickCategory }) {
  const classes = useStyles();
  let history = useHistory();

  // STATE
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogId, setDialogId] = useState("");

  // EFFECT
  useEffect(() => {
    !localStorage.getItem("recipeCategoriesList")
      ? fetchCategories()
      : setCategories(
          JSON.parse(localStorage.getItem("recipeCategoriesList")).categories
        );
  }, []);

  // Dialog
  const handleDialogOpen = (id) => {
    setDialogOpen(true);
    setDialogId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchCategories = async () => {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const catObj = await data.json();
    setCategories(catObj.categories);
    localStorage.setItem("recipeCategoriesList", JSON.stringify(catObj));
  };

  return (
    <Container>
      <Grid container justify="center" spacing={2}>
        {Boolean(categories) &&
          categories.map(
            ({
              strCategory,
              strCategoryThumb,
              idCategory,
              strCategoryDescription,
            }) => (
              <>
                <Grid item xs={6} sm={4} md={3} xl={2} key={idCategory}>
                  <Card className={classes.root} key={idCategory}>
                    <CardMedia
                      className={classes.media}
                      image={strCategoryThumb}
                      title={strCategory}
                    />
                    <CardActions disableSpacing className={classes.cardActions}>
                      <IconButton
                        aria-label={`Visit ${strCategory}`}
                        onClick={() => clickCategory("", strCategory, history)}
                      >
                        {strCategory}
                      </IconButton>
                      <IconButton
                        onClick={() => handleDialogOpen(idCategory)}
                        aria-label="show more"
                      >
                        <WallpaperIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
                {/* DIALOG */}
                <DialogDescription
                  open={dialogOpen}
                  dialogID={dialogId}
                  handleDialogClose={handleDialogClose}
                  id={idCategory}
                  thumbnail={strCategoryThumb}
                  title={strCategory}
                  description={strCategoryDescription}
                />
              </>
            )
          )}
      </Grid>
    </Container>
  );
}
