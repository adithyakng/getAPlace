import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";

// Custom Modules
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import CustomEditor from "../../ui-elements/CustomEditor/CustomEditor";
import CustomFileUploader from "../../ui-elements/CustomFileUploader/CustomFileUploader";
import CustomMultiTypeInput from "../../ui-elements/CustomMultiTypeInput/CustomMultiTypeInput";
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import utils from "../../utils/utils";
import types from "../../types/types";
import Carousel from "react-material-ui-carousel";

const HouseListing = ({ currHouse, setErrorModal, isView = false }) => {
  // States
  const [house, setHouse] = useState(new types.NewHouseAdObject(currHouse));

  // Hnadlers
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setHouse({ ...house, [name]: value });
  };

  const uploadFileHandler = async (e) => {
    const metadata = e.target.name + "metadata";
    const metadata_data = [];

    for (let i = 0; i < e.target.files.length; i++) {
      metadata_data.push(e.target.files[i].name);
    }
    const fileData = await utils.extractBase64fromFiles(e.target.files);
    setHouse({
      ...house,
      [e.target.name]: fileData,
      [metadata]: metadata_data,
    });
  };

  const createHouseHandler = async (e) => {
    try {
      const requestObject = { ...house };
      requestObject["amenities"] = house["amenities"].list;
      requestObject["features"] = house["features"].list;
      requestObject["faqs"] = JSON.stringify(
        document.getElementById("faqs" + requestObject._id + "trix").innerHTML
      );
      requestObject["id"] = null;
      requestObject["_id"] = null;
      await axios.post("/admin/addHouse", requestObject, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setErrorModal({
        show: true,
        title: "Creating Advertisement Successful!",
        body: "A new listing has been added successfully",
      });

      window.location.reload();
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Creating Advertisement Failed!",
        body: JSON.stringify(error.response.data),
      });
    }
  };

  const updateHouseHandler = async (e) => {
    try {
      const requestObject = { ...house };
      requestObject["amenities"] = house["amenities"].list;
      requestObject["features"] = house["features"].list;
      requestObject["faqs"] = JSON.stringify(
        document.getElementById("faqs" + requestObject._id + "trix").innerHTML
      );
      await axios.put("/admin/editHouse", requestObject, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setErrorModal({
        show: true,
        title: "Updating Advertisement Successful!",
        body: `The listing has been updated successfully`,
      });
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Updating Advertisement Failed!",
        body: JSON.stringify(error.response.data),
      });
    }
  };

  const deleteHouseHandler = async (e) => {
    try {
      const requestObject = { ...house };
      await axios.delete("/admin/deleteHouse?id=" + requestObject.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setErrorModal({
        show: true,
        title: "Deleting Advertisement Successful!",
        body: `The listing has been deleted successfully`,
      });
      window.location.reload();
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Deleting Advertisement Failed!",
        body: JSON.stringify(error.response.data),
      });
    }
  };

  // Custom Component
  function Item({ imageLoc }) {
    return (
      <Paper sx={{ position: "relative", left: "25%" }}>
        <img src={imageLoc} alt={imageLoc} width="100%" height="100%" />
      </Paper>
    );
  }

  return (
    <div
      style={{
        boxShadow: "5px 5px 20px 2px black",
        backgroundColor: "var(--main-bg-color2)",
        padding: "2%",
        margin: "1%",
        minHeight: "110vh",
        borderRadius: "8px",
      }}
    >
      <CustomMultiTypeInput
        label={"Features"}
        labelName={"features"}
        labelAdd={"Feature"}
        labelAddName={"feature"}
        value={house}
        setValue={setHouse}
      />
      <CustomMultiTypeInput
        label={"Amenities"}
        labelName={"amenities"}
        labelAdd={"Amenity"}
        labelAddName={"amenity"}
        value={house}
        setValue={setHouse}
      />
      <CustomTextField
        helperText={`Advertisement Start Date`}
        id={"startDate"}
        name={"startDate"}
        label={"Start Date"}
        value={house}
        type={"date"}
        setValue={changeHandler}
        margin="0.4%"
        width="16%"
      />

      <CustomTextField
        helperText={`Please enter Cost`}
        id={"cost"}
        name={"cost"}
        label={"Cost"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.4%"
        width="19.5%"
      />
      <CustomTextField
        helperText={`Please enter no of bedrooms`}
        id={"bedroom"}
        name={"bedroom"}
        label={"Bedrooms"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.4%"
        width="20%"
      />
      <CustomTextField
        helperText={`Please enter no of bathrooms`}
        id={"bathroom"}
        name={"bathroom"}
        label={"Bathroom"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.4%"
        width="20%"
      />
      <CustomTextField
        helperText={`Please enter length of carpet area`}
        id={"carpetArea"}
        name={"carpetArea"}
        label={"Carpet Area"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.4%"
        width="20%"
      />
      <CustomTextField
        helperText={`Please enter address`}
        id={"address"}
        name={"address"}
        label={"Address"}
        value={house}
        setValue={changeHandler}
        margin="0.5%"
      />

      <CustomEditor
        editorId={"faqs"}
        uniqueId={house._id}
        value={house}
        setValue={changeHandler}
      />

      <CustomFileUploader
        id="images"
        name="images"
        value="Upload Images"
        valueListName="imagesmetadata"
        valuesList={{
          imagesmetadata: JSON.stringify(house["imagesmetadata"]),
        }}
        clickHandler={uploadFileHandler}
        key={`images`}
      />
      <CustomFileUploader
        id="leaseAgreement"
        name="leaseAgreement"
        value="Upload Lease Agreement"
        valueListName="leaseAgreementmetadata"
        valuesList={{
          leaseAgreementmetadata: JSON.stringify(
            house["leaseAgreementmetadata"]
          ),
        }}
        clickHandler={uploadFileHandler}
        key={`lease_agreement`}
        isMultiple={false}
      />

      {isView ? (
        <div>
          <Carousel
            navButtonsAlwaysVisible={false}
            sx={{
              maxWidth: "40vw",
              position: "relative",
              left: "-150px",
              maxHeight: "20vw",
            }}
          >
            {house.images.map((row) => {
              return <Item imageLoc={row} />;
            })}
          </Carousel>
        </div>
      ) : null}

      {!isView ? (
        <CustomButton
          id="addHouse"
          name="addHouse"
          value="Create Advertisement"
          clickHandler={createHouseHandler}
          key={`create_house_button`}
        />
      ) : null}

      {isView ? (
        <CustomButton
          id="updateHouse"
          name="updateHouse"
          value="Update Advertisement"
          clickHandler={updateHouseHandler}
          key={`update_house_button`}
          width="46%"
        />
      ) : null}

      {isView ? (
        <CustomButton
          id="deleteHouse"
          name="deleteHouse"
          value="Delete Advertisement"
          clickHandler={deleteHouseHandler}
          key={`delete_house_button`}
          width="46%"
        />
      ) : null}
    </div>
  );
};

export default HouseListing;
