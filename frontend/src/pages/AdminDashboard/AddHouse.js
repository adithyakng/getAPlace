import { useState } from "react";
import axios from "axios";

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
    let fileData = await extractBase64fromFiles(e.target.files);
    if (fileData.length === 1) {
      fileData = fileData[0];
    }

    setNewHouse({ ...newHouse, [e.target.name]: fileData });
  };

  const extractBase64fromFiles = async (files) => {
    const resp = [];
    for (let i = 0; i < files.length; i++) {
      resp.push(await toBase64(files[i]));
    }

    return resp;
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const createHouseHandler = async (e) => {
    try {
      const requestObject = { ...newHouse };
      requestObject["ammenities"] = newHouse["amenities"].list;
      requestObject["features"] = newHouse["features"].list;
      const resp = await axios.post("/admin/addHouse", requestObject);
    } catch (error) {
      // setErrorModal({
      //   show: true,
      //   title: "Creating Advertisement Failed!",
      //   body: error.response.data,
      // });
      console.log(error);
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
        clickHandler={uploadFileHandler}
        key={`image_upload`}
      />
      <CustomFileUploader
        id="leaseAgreement"
        name="leaseAgreement"
        value="Upload Lease Agreement"
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
