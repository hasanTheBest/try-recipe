import React from "react";
// Router
import { useHistory } from "react-router-dom";
// Material UI Components
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CategoryBar({ categoryFilter, tabs, categories }) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          onChange={(e, value) => categoryFilter(value, "", history)}
          value={tabs.value}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab style={{ display: "none" }} label="placeholder" value="" />
          {/* {listCategories.map((item, i) => ( */}
          {categories.map((item, i) => (
            <Tab
              key={i}
              index={i}
              label={item.strCategory}
              value={item.strCategory}
            />
            // </Link>
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
