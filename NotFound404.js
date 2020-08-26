import React, { useEffect } from "react";
import { makeStyles, Box, Typography, Button, Paper } from "@material-ui/core";
import spacing from "@material-ui/system";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  alert: {
    textAlign: "center",
  },
}));
export default function NotFound404({ closeBackdrop, error }) {
  const classes = styles();
  useEffect(() => closeBackdrop, []);
  if (!error) {
    return (
      <>
        <Box py={5} px={3} className={classes.alert}>
          <Typography variant="h2">Not Found</Typography>
        </Box>
        <Box p={3} my={5} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<Home />}
            to="/"
            component={Link}
          >
            Return to
          </Button>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box py={5} px={3}>
        <div className={classes.alert}>
          <Typography variant="h3">Server Error</Typography>
          {error instanceof window.Response ? (
            <Typography variant="subtitle1" component="p">
              <b>{error.status}</b> on <b>{error.url}</b>
              <br />
              <small>{error.statusText}</small>
            </Typography>
          ) : (
            <Typography variant="subtitle1" component="p">
              <code>{error.toString()}</code>
            </Typography>
          )}
        </div>
      </Box>
      <Box p={3} my={5} style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<Home />}
        >
          Return to
        </Button>
      </Box>
    </>
  );
}
