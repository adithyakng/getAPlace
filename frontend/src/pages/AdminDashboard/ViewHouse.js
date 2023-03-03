import { useState, useEffect } from "react";
import axios from "axios";

import types from "../../types/types";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";
import Carousel from "react-material-ui-carousel";
import HouseListing from "../../components/HouseListing/HouseListing";

const ViewHouse = () => {
  // States
  const [housesArr, setHousesArr] = useState([]);
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());

  // UseEffect
  useEffect(() => {
    initHouseListings();
  }, []);

  // Hnadlers
  const initHouseListings = async () => {
    const resp = await axios.post("/admin/listHouses", {});
    let newHousesArr = [];
    for (let i = 0; i < resp.data.length; i++) {
      newHousesArr.push(new types.NewHouseAdObject(resp.data[i]));
    }

    setHousesArr(newHousesArr);
  };

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
      {housesArr.map((house) => {
        return (
          <>
            <Carousel>
              <HouseListing
                currHouse={house}
                setErrorModal={setErrorModal}
                isView={true}
              />
            </Carousel>
          </>
        );
      })}
    </>
  );
};

export default ViewHouse;
