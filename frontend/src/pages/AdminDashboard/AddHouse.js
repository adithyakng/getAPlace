import { useState } from "react";
import axios from "axios";
import utils from "../../utils/utils";

import types from "../../types/types";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import CustomFileUploader from "../../ui-elements/CustomFileUploader/CustomFileUploader";
import CustomMultiTypeInput from "../../ui-elements/CustomMultiTypeInput/CustomMultiTypeInput";
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";

const AddHouse = () => {
  const [newHouse, setNewHouse] = useState(new types.NewHouseAdObject());
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());

  // Hnadlers
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewHouse({ ...newHouse, [name]: value });
  };

  const uploadFileHandler = async (e) => {
    const metadata = e.target.name + "metadata";
    const metadata_data = [];

    for (let i = 0; i < e.target.files.length; i++) {
      metadata_data.push(e.target.files[i].name);
    }
    const fileData = await utils.extractBase64fromFiles(e.target.files);
    setNewHouse({
      ...newHouse,
      [e.target.name]: fileData,
      [metadata]: metadata_data,
    });
  };

  const createHouseHandler = async (e) => {
    try {
      const requestObject = { ...newHouse };
      requestObject["ammenities"] = newHouse["amenities"].list;
      requestObject["features"] = newHouse["features"].list;
      const resp = await axios.post("/admin/addHouse", requestObject);
    } catch (error) {
      setErrorModal({
        show: true,
        title: "Creating Advertisement Failed!",
        body: error.response.data,
      });
    }
  };

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
      <CustomMultiTypeInput
        label={"Features"}
        labelName={"features"}
        labelAdd={"Feature"}
        labelAddName={"feature"}
        value={newHouse}
        setValue={setNewHouse}
      />
      <CustomTextField
        helperText={`Please enter Cost`}
        id={"cost"}
        name={"cost"}
        label={"Cost"}
        value={newHouse.cost}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomTextField
        helperText={`Please enter no of bedrooms`}
        id={"bedroom"}
        name={"bedroom"}
        label={"Bedrooms"}
        value={newHouse.bedroom}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomTextField
        helperText={`Please enter no of bathrooms`}
        id={"bathroom"}
        name={"bathroom"}
        label={"Bathroom"}
        value={newHouse.bathroom}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomTextField
        helperText={`Please enter length of carpet area`}
        id={"carpetArea"}
        name={"carpetArea"}
        label={"Carpet Area"}
        value={newHouse.carpetArea}
        setValue={changeHandler}
        type="number"
        margin="0.5%"
      />
      <CustomMultiTypeInput
        label={"Amenities"}
        labelName={"amenities"}
        labelAdd={"Amenity"}
        labelAddName={"amenity"}
        value={newHouse}
        setValue={setNewHouse}
      />
      <CustomTextField
        helperText={`Please enter address`}
        id={"address"}
        name={"address"}
        label={"Address"}
        value={newHouse.address}
        setValue={changeHandler}
        margin="0.5%"
      />
      <CustomFileUploader
        id="images"
        name="images"
        value="Upload Images"
        valueListName="imagesmetadata"
        valuesList={{
          imagesmetadata: JSON.stringify(newHouse["imagesmetadata"]),
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
            newHouse["leaseAgreementmetadata"]
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
    </>
  );
};

export default AddHouse;
