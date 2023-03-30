import React, { useState } from "react";

// Custom Modules

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RaiseRequest = ({ showModal, setShowModal, houseId }) => {
  // States
  const [requestMessage, setRequestMessage] = useState({ requestMessage: "" });

  // Hnadlers
  const raiseRequestHandler = async () => {
    try {
      await axios.post(
        `/users/raiseRequest`,
        { houseId: houseId, message: requestMessage.requestMessage },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setShowModal(false);
      setRequestMessage("");
    } catch (e) {
      setShowModal(false);
      setRequestMessage("");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showModal}>
        <Box sx={style}>
          <CustomTextField
            helperText={`Describe your Maintenance Request`}
            id={"requestMessage"}
            name={"requestMessage"}
            label={"Request Information"}
            value={requestMessage}
            setValue={(e) => {
              setRequestMessage({ requestMessage: e.target.value });
            }}
            type="text"
          />
          <CustomButton
            id="raiserequestbutton"
            name="raiserequestbutton"
            value="Raise Request"
            clickHandler={raiseRequestHandler}
            key={`raise_request_button`}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default RaiseRequest;
