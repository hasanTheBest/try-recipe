import React, { useState } from "react";
// Router
import { useHistory } from "react-router-dom";
// Material UI
import {
  InputLabel,
  Hidden,
  MenuItem,
  FormControl,
  Select,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";

// Material UI Styles
import { fade, makeStyles } from "@material-ui/core/styles";
import spacing from "@material-ui/system";

// Material Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import Brightness4Icon from "@material-ui/icons/Brightness4";

// Components
import CategoryBar from "./CategoryBar";
import PopperLetterFilter from "./PopperLetterFilter";
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "40px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    // width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    visibility: "hidden",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  titleWrapper: {
    display: "inline-flex",
    alignItems: "center",
  },
  filterWrapper: {
    display: "inline-flex",
    alignItems: "center",
    width: "240px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  filterButton: {
    position: "relative",
    zIndex: 100,
    right: "-75px",
  },
}));

export default function Nav({
  handleSearchSubmit,
  handleSearchChange,
  onAreaFilter,
  categoryFilter,
  handleClickFilterLetter,
  tabs,
  listAreas,
  listCategories,
  listIngredients,
  handleClickIngredient,
  handleChangeSwitch,
  nightMode,
}) {
  const classes = useStyles();
  let history = useHistory();

  // STATE
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // Select Component
  const handleCloseSelect = () => {
    setOpen(false);
  };
  const handleOpenSelect = () => {
    setOpen(true);
  };

  // Drawer Component
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div className={classes.titleWrapper}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Recipes
              </Typography>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={(e) => handleSearchSubmit(e, "", history)}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
            <Hidden only="xs">
              <div className={classes.filterWrapper}>
                <Hidden smDown>
                  <Box mr={1}>
                    <Button
                      aria-label="Night mode toggle"
                      onClick={handleChangeSwitch}
                      color="primary"
                      variant="contained"
                    >
                      {<Brightness4Icon />}
                    </Button>
                  </Box>
                </Hidden>
                <Box mr={2}>
                  <PopperLetterFilter
                    handleClickFilterLetter={handleClickFilterLetter}
                  />
                </Box>
                <Hidden smDown>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenSelect}
                    endIcon={<ExpandMoreRoundedIcon />}
                  >
                    {<TuneRoundedIcon />}
                  </Button>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">
                      Area
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value=""
                      onChange={(e) => onAreaFilter(e, 0, history)}
                    >
                      <MenuItem value="">
                        <em>Area</em>
                      </MenuItem>
                      {Boolean(listAreas) &&
                        listAreas.map(({ strArea }, i) => (
                          <MenuItem key={i} value={strArea}>
                            {strArea}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Hidden>
              </div>
            </Hidden>
          </Toolbar>
          {/* Category Bar */}
          <Hidden smDown>
            <CategoryBar
              categories={listCategories}
              categoryFilter={categoryFilter}
              tabs={tabs}
            />
          </Hidden>
        </AppBar>
      </div>
      <NavDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        toggleDrawer={toggleDrawer}
        categories={listCategories}
        ingredients={listIngredients}
        areas={listAreas}
        categoryFilter={categoryFilter}
        onAreaFilter={onAreaFilter}
        handleClickIngredient={handleClickIngredient}
        handleChangeSwitch={handleChangeSwitch}
        nightMode={nightMode}
      />
    </>
  );
}
