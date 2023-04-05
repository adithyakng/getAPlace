import React, { useState } from "react";
import Paper from "@mui/material/Paper";

// Custom Modules
import types from "../../types/types";
import Carousel from "react-material-ui-carousel";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import QuizIcon from "@mui/icons-material/Quiz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import axios from "axios";
import RaiseRequestsModal from "./RaiseRequestModal";
import ViewAllRequestsModal from "./ViewAllRequestsModal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ViewHouseListing = ({
  currHouse,
  setErrorModal,
  isView = false,
  isViewLease = false,
}) => {
  // States
  const [house, setHouse] = useState(currHouse);
  const [expanded, setExpanded] = React.useState(false);
  const [showRaiseRequestModal, setShowRaiseRequestModal] = useState(false);
  const [showAllRequestsModal, setShowAllRequestsModal] = useState(false);

  // Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const acceptLease = async () => {
    try {
      await axios.post(
        "/users/submitLease",
        {
          houseId: house.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setErrorModal(
        "Thank you for accepting the lease. You can now view your leases in the leases section."
      );
    } catch (e) {
      setErrorModal(
        "Unable to accept the current lease. Please try again later!"
      );
      console.log(e);
    }
  };

  // Custom Component
  function Item({ imageLoc }) {
    return (
      <Paper style={{ width: "50vh" }}>
        <img src={imageLoc} alt={imageLoc} width="100%" height="500px" />
      </Paper>
    );
  }

  return (
    <>
      <RaiseRequestsModal
        showModal={showRaiseRequestModal}
        setShowModal={setShowRaiseRequestModal}
        houseId={house.id}
      />
      <ViewAllRequestsModal
        showModal={showAllRequestsModal}
        setShowModal={setShowAllRequestsModal}
        houseId={house.id}
      />

      <Card sx={{ maxWidth: 500, margin: "2%", float: "left" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              Ad
            </Avatar>
          }
          action={
            <>
              <IconButton
                aria-label={"Chat Room for " + house.id}
                onClick={() => {
                  window.open("/users/room/" + house.chatRoomId);
                }}
              >
                <ChatIcon />
              </IconButton>
              <IconButton
                aria-label="FAQs"
                onClick={() => {
                  window.open("/users/faqs/" + house.id);
                }}
              >
                <QuizIcon />
              </IconButton>
            </>
          }
          title={house.id}
          subheader={house.startDate}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>Address:</b> {house.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>No of bedrooms:</b> {house.bedroom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>No of bathrooms:</b> {house.bathroom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Carpet area:</b> {house.carpetArea}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Price:</b> {house.cost}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show More"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <Carousel navButtonsAlwaysVisible={false}>
                {house.images.map((row) => {
                  return <Item imageLoc={row} />;
                })}
              </Carousel>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Features</b>
              <ul>
                {house.features.list.map((feature) => {
                  return <li>{feature}</li>;
                })}
              </ul>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Amenities</b>
              <ul>
                {house.amenities.list.map((amenity) => {
                  return <li>{amenity}</li>;
                })}
              </ul>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isViewLease ? (
                <>
                  <CustomButton
                    id="raiserequests"
                    name="raiserequest"
                    value="Raise Maintenance Request"
                    clickHandler={() => {
                      setShowRaiseRequestModal(true);
                    }}
                  />
                  <CustomButton
                    id="viewrequests"
                    name="viewrequests"
                    value="View All Requests"
                    clickHandler={() => {
                      setShowAllRequestsModal(true);
                    }}
                  />
                </>
              ) : (
                <>
                  <CustomButton
                    id="viewlease"
                    name="viewlease"
                    value="View the agreement"
                    clickHandler={() => {
                      setHouse({ ...house, isAgreementViewed: true });
                      window.open(house.leaseAgreement[0]);
                    }}
                  />
                  <CustomButton
                    id="accpetlease"
                    name="acceptlease"
                    value="Accept the agreement"
                    isDisabled={!house.isAgreementViewed}
                    clickHandler={acceptLease}
                  />
                </>
              )}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default ViewHouseListing;
