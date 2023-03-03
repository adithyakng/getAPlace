import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";

// Custom Modules
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import CustomFileUploader from "../../ui-elements/CustomFileUploader/CustomFileUploader";
import CustomMultiTypeInput from "../../ui-elements/CustomMultiTypeInput/CustomMultiTypeInput";
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import utils from "../../utils/utils";
import types from "../../types/types";

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
      await axios.post("/admin/addHouse", requestObject);
      setErrorModal({
        show: true,
        title: "Creating Advertisement Successful!",
        body: "A new listing has been added successfully",
      });
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Creating Advertisement Failed!",
        body: error.response.data,
      });
    }
  };

  const updateHouseHandler = async (e) => {
    try {
      const requestObject = { ...house };
      requestObject["amenities"] = house["amenities"].list;
      requestObject["features"] = house["features"].list;
      await axios.put("/admin/editHouse", requestObject);
      setErrorModal({
        show: true,
        title: "Updating Advertisement Successful!",
        body: `The listing has been updated successfully`,
      });
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Updating Advertisement Failed!",
        body: error.response.data,
      });
    }
  };

  const deleteHouseHandler = async (e) => {
    try {
      await axios.delete("/admin/deleteHouse", house._id);
      setErrorModal({
        show: true,
        title: "Deleting Advertisement Successful!",
        body: `The listing has been deleted successfully`,
      });
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Deleting Advertisement Failed!",
        body: error.response.data,
      });
    }
  };

  // Custom Component
  function Item({ imageLoc }) {
    return (
      <Paper>
        <img src={imageLoc} alt={imageLoc} />
      </Paper>
    );
  }

  return (
    <>
      {isView
        ? house.images.map((row) => {
            return <Item imageLoc={row.Location} />;
          })
        : null}
      <CustomMultiTypeInput
        label={"Features"}
        labelName={"features"}
        labelAdd={"Feature"}
        labelAddName={"feature"}
        value={house}
        setValue={setHouse}
      />
      <CustomTextField
        helperText={`Please enter Cost`}
        id={"cost"}
        name={"cost"}
        label={"Cost"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomTextField
        helperText={`Please enter no of bedrooms`}
        id={"bedroom"}
        name={"bedroom"}
        label={"Bedrooms"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomTextField
        helperText={`Please enter no of bathrooms`}
        id={"bathroom"}
        name={"bathroom"}
        label={"Bathroom"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomTextField
        helperText={`Please enter length of carpet area`}
        id={"carpetArea"}
        name={"carpetArea"}
        label={"Carpet Area"}
        value={house}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
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
        helperText={`Please enter address`}
        id={"address"}
        name={"address"}
        label={"Address"}
        value={house}
        setValue={changeHandler}
        margin="0.5%"
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
      <CustomButton
        id="addHouse"
        name="addHouse"
        value="Create Advertisement"
        clickHandler={createHouseHandler}
        key={`create_house_button`}
      />

      <CustomButton
        id="updateHouse"
        name="updateHouse"
        value="Update Advertisement"
        clickHandler={updateHouseHandler}
        key={`update_house_button`}
      />

      <CustomButton
        id="deleteHouse"
        name="deleteHouse"
        value="Delete Advertisement"
        clickHandler={deleteHouseHandler}
        key={`delete_house_button`}
      />
    </>
  );
};

export default HouseListing;
