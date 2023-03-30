import React, { useState, useEffect } from "react";

// Custom Modules

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";

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

const ViewAllRequestsModal = ({ showModal, setShowModal, houseId }) => {
  // States
  const [requestMessages, setRequestMessages] = useState([]);

  // UseEffect
  useEffect(() => {
    initRequestMessages();
  }, [showModal]);

  // Hnadlers
  const initRequestMessages = async () => {
    try {
      const resp = await axios.get(`/users/getAllRequests`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setRequestMessages(resp.data.requests);
    } catch (e) {
      setRequestMessages([]);
    }
  };

  console.log(houseId);

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
          {requestMessages.map((row) => {
            return row.houseId === houseId ? (
              <>
                <p style={{ color: `${row.status === 0 ? "red" : "green"}` }}>
                  Request: {row.message}
                </p>
              </>
            ) : (
              <></>
            );
          })}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewAllRequestsModal;
