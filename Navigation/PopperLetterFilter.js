import React from "react";
// Router
import { useHistory } from "react-router-dom";
// Material UI Components
import {
  makeStyles,
  Button,
  Popper,
  Fade,
  Fab,
  Paper,
  Typography,
} from "@material-ui/core";
// Third party helper
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
// Material UI Icons
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";

const useStyles = makeStyles((theme) => ({
  popper: {
    maxWidth: "560px",
  },
  fabContainer: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

export default function PopperLetterFilter({ handleClickFilterLetter }) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            endIcon={<ExpandMoreRoundedIcon />}
            color="primary"
            {...bindToggle(popupState)}
          >
            {<FilterVintageIcon />}
          </Button>
          <Popper
            {...bindPopper(popupState)}
            transition
            className={classes.popper}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper elevation={3} className={classes.fabContainer}>
                  <Typography variant="subtitle2" component="p">
                    Filter by First Letter
                  </Typography>
                  {[
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                    "f",
                    "g",
                    "h",
                    "i",
                    "j",
                    "k",
                    "l",
                    "m",
                    "n",
                    "o",
                    "p",
                    "q",
                    "r",
                    "s",
                    "t",
                    "u",
                    "v",
                    "w",
                    "x",
                    "y",
                    "z",
                  ].map((letter) => (
                    <Fab
                      key={letter}
                      color="default"
                      size="small"
                      className={classes.fab}
                      onClick={() => handleClickFilterLetter(letter, history)}
                    >
                      {letter}
                    </Fab>
                  ))}
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
