import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ErrorModal({
  errorModal,
  setErrorModal,
  children = () => {},
}) {
  const handleClose = () => {
    setErrorModal({ ...errorModal, show: false });
    children();
  };

  return (
    <div>
      <Dialog
        open={errorModal.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>{errorModal.title}</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorModal.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
