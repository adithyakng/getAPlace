import { useState } from "react";

// Custom Packages
import HouseListing from "../../components/HouseListing/HouseListing";
import types from "../../types/types";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";

const AddHouse = () => {
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
      <HouseListing
        currHouse={{}}
        errorModal={errorModal}
        setErrorModal={setErrorModal}
      />
    </>
  );
};

export default AddHouse;
