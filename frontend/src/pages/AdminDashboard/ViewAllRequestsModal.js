import React, { useState, useEffect } from "react";

// Custom Modules

import Box from "@mui/material/Box";
import axios from "axios";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";

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

  // Handlers
  const initRequestMessages = async () => {
    try {
      const resp = await axios.get(`/admin/getAllRequests`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setRequestMessages(resp.data.requests);
    } catch (e) {
      setRequestMessages([]);
    }
  };

  const resolveIssuesHandler = async (requestId) => {
    try {
      await axios.post(
        `/admin/actOnRequest`,
        { requestId: requestId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      window.location.reload();
    } catch (e) {
      window.location.reload();
    }
  };

  return (
    <Box sx={style}>
      {requestMessages.map((row) => {
        return (
          <>
            <p style={{ color: `${row.status === 0 ? "red" : "green"}` }}>
              Request: {row.message}
            </p>
            <CustomButton
              id="resolveIssue"
              name="resolveIssue"
              value="Resolve Issue"
              isDisabled={row.status === 1}
              clickHandler={() => {
                resolveIssuesHandler(row.id);
              }}
              key={`resolveIssueButton`}
            />
          </>
        );
      })}
    </Box>
  );
};

export default ViewAllRequestsModal;
