import React, { useState } from "react";
// Router
import { Link, useLocation, useHistory } from "react-router-dom";
// Material UI
import {
  SwipeableDrawer,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Hidden,
  Collapse,
  makeStyles,
  TextField,
  FormControlLabel,
  Switch,
  Box,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

// Material Icons
import EditLocationIcon from "@material-ui/icons/EditLocation";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import CategoryIcon from "@material-ui/icons/Category";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import HomeIcon from "@material-ui/icons/Home";
import LabelImportantOutlinedIcon from "@material-ui/icons/LabelImportantOutlined";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

// STYLES
const styles = makeStyles((theme) => ({
  drawerList: {
    width: "300px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function NavDrawer({
  toggleDrawer,
  openDrawer,
  setOpenDrawer,
  categories,
  areas,
  ingredients,
  categoryFilter,
  onAreaFilter,
  handleClickIngredient,
  handleChangeSwitch,
  nightMode,
}) {
  const classes = styles();
  const { pathname } = useLocation();
  let history = useHistory();

  // STATE
  const [openCategories, setOpenCategories] = useState(false);
  const [openAreas, setOpenAreas] = useState(false);
  const [openIngredients, setOpenIngredients] = useState(false);

  const handleMenuItemClick = (name) => {
    // Keep open drawer
    // setOpenDrawer(false);
    switch (name) {
      case "categories":
        setOpenCategories(!openCategories);
        break;
      case "areas":
        setOpenAreas(!openAreas);
        break;
      case "ingredients":
        setOpenIngredients(!openIngredients);
        break;
      default:
        setOpenIngredients(openIngredients);
    }
  };
  // Autocomplete Change
  const handleAutocompleteChange = (event, value) => {
    if (Boolean(value)) handleClickIngredient(value.strIngredient, history);
    toggleDrawer("left", false);
  };
  return (
    <>
      {/* DRAWER LEFT */}
      <div className={classes.drawer}>
        <SwipeableDrawer
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", false)}
        >
          <div className={classes.drawerList} role="presentation">
            {/* Visible only 600px and down */}
            <Hidden smUp>
              <List>
                <ListItem
                  button
                  onClick={(e) => handleMenuItemClick("categories")}
                >
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Categories" />
                  {openCategories ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCategories} timeout="auto" unmountOnExit>
                  <list
                    component="div"
                    disablePadding
                    onClick={toggleDrawer("left", false)}
                  >
                    {categories &&
                      categories.map(({ strCategory }) => (
                        <ListItem
                          button
                          className={classes.nested}
                          onClick={(e) =>
                            categoryFilter("", strCategory, history)
                          }
                          selected={`/category/${strCategory}` === pathname}
                        >
                          <ListItemIcon>
                            <LabelOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary={strCategory} />
                        </ListItem>
                      ))}
                  </list>
                </Collapse>
                <ListItem button onClick={(e) => handleMenuItemClick("areas")}>
                  <ListItemIcon>
                    <EditLocationIcon />
                  </ListItemIcon>
                  <ListItemText primary="Areas" />
                  {openAreas ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAreas} timeout="auto" unmountOnExit>
                  <list
                    component="div"
                    disablePadding
                    onClick={toggleDrawer("left", false)}
                  >
                    {areas &&
                      areas.map(({ strArea }) => (
                        <ListItem
                          button
                          className={classes.nested}
                          onClick={(e) => onAreaFilter(e, strArea, history)}
                          selected={`/area/${strArea}` === pathname}
                        >
                          <ListItemIcon>
                            <LabelImportantOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary={strArea} />
                        </ListItem>
                      ))}
                  </list>
                </Collapse>
                <ListItem
                  button
                  onClick={(e) => handleMenuItemClick("ingredients")}
                >
                  <ListItemIcon>
                    <EmojiNatureIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ingredients" />
                  {openIngredients ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openIngredients} timeout="auto" unmountOnExit>
                  <Box p={1}>
                    <Autocomplete
                      autoComplete
                      id="highlights-ingredient"
                      options={ingredients}
                      getOptionLabel={({ strIngredient }) => strIngredient}
                      size="small"
                      onChange={handleAutocompleteChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Ingredient"
                          variant="filled" // outlined
                          margin="normal"
                        />
                      )}
                      renderOption={({ strIngredient }, { inputValue }) => {
                        const matches = match(strIngredient, inputValue);
                        const parts = parse(strIngredient, matches);

                        return (
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </div>
                        );
                      }}
                    />
                  </Box>
                </Collapse>
              </List>
              <Divider />
            </Hidden>
            <List
              onClick={toggleDrawer("left", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              <ListItem
                button
                to="/"
                component={Link}
                selected={"/" === pathname}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                button
                to="/category"
                component={Link}
                selected={"/category" === pathname}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem
                button
                to="/ingredients"
                component={Link}
                selected={"/ingredients" === pathname}
              >
                <ListItemIcon>
                  <EmojiNatureIcon />
                </ListItemIcon>
                <ListItemText primary="Ingredients" />
              </ListItem>
              <ListItem
                button
                to="/area"
                component={Link}
                selected={"/area" === pathname}
              >
                <ListItemIcon>
                  <EditLocationIcon />
                </ListItemIcon>
                <ListItemText primary="Areas" />
              </ListItem>
              <ListItem
                button
                to="/about"
                component={Link}
                selected={"/about" === pathname}
              >
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </List>
            <Hidden mdUp>
              <Divider />
              {/* SWITCH */}
              <FormControlLabel
                onClick={toggleDrawer("left", false)}
                value="dark"
                control={
                  <Switch
                    color="primary"
                    checked={Boolean(Number(nightMode))}
                    onChange={handleChangeSwitch}
                  />
                }
                label="Theme Dark"
                labelPlacement="start"
              />
            </Hidden>
          </div>
        </SwipeableDrawer>
      </div>
    </>
  );
}
