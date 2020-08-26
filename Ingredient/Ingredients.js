import React, { useState } from "react";
// Router
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Container,
  Grid,
} from "@material-ui/core";
import ArtTrackRoundedIcon from "@material-ui/icons/ArtTrackRounded";
// Components
import DialogDescription from "../Components/DialogDescription";
const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Ingredients({ handleClickIngredient, ingredients }) {
  const classes = useStyles();
  let history = useHistory();
  // STATE
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogId, setDialogId] = useState("");
  const [backdropOpen, setBackdropOpen] = useState(false);

  // BACKDROP
  const handleCloseBackdrop = () => setBackdropOpen(false);

  // Dialog
  const handleDialogOpen = (id) => {
    setDialogOpen(true);
    setDialogId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Container>
        <Grid container justify="center" spacing={2}>
          {ingredients.map(
            ({ idIngredient, strIngredient, strDescription }) => (
              <Grid key={idIngredient} item xs={6} sm={4} md={3} xl={2}>
                <Card variant="outlined" className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image={`https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`}
                    title={strIngredient}
                  />
                  <CardActions className={classes.cardActions}>
                    <IconButton
                      onClick={() =>
                        handleClickIngredient(strIngredient, history)
                      }
                      aria-label={`visit ${strIngredient}`}
                    >
                      {strIngredient}
                    </IconButton>
                    <IconButton
                      onClick={() => handleDialogOpen(idIngredient)}
                      aria-label="Dialog"
                    >
                      <ArtTrackRoundedIcon />
                    </IconButton>
                  </CardActions>
                </Card>
                {/*  DIALOG */}
                <DialogDescription
                  open={dialogOpen}
                  dialogID={dialogId}
                  handleDialogClose={handleDialogClose}
                  id={idIngredient}
                  title={strIngredient}
                  description={strDescription}
                  thumbnail={`https://www.themealdb.com/images/ingredients/${strIngredient}.png`}
                />
              </Grid>
            )
          )}
        </Grid>
      </Container>
      {/* BACKDROP */}
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}
