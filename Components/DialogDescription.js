import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
// image
import Image from "material-ui-image";

export default function DialogDescription({
  id,
  dialogID,
  description,
  title,
  open,
  handleDialogClose,
  thumbnail,
}) {
  // State
  const [showImage, setShowImage] = useState(false);
  // EFFECT
  useEffect(() => {
    setTimeout(() => {
      setShowImage(true);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open && id === dialogID}
        onClose={handleDialogClose}
        aria-labelledby={`${id}-${title}`}
      >
        <DialogContent>
          <Paper>
            <Image
              src={showImage ? thumbnail : ""}
              aspectRatio={16 / 9}
              title={title}
            />
          </Paper>
          <DialogTitle id={`${id}-${title}`}>{title}</DialogTitle>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
