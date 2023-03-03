import { useState, useEffect } from "react";
import axios from "axios";

import types from "../../types/types";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";
import Carousel from "react-material-ui-carousel";
import ViewHouseListing from "../../components/ViewHouseListing/ViewHouseListing";

const UsersViewHouse = () => {
  // States
  const [housesArr, setHousesArr] = useState([]);
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());

  // UseEffect
  useEffect(() => {
    initHouseListings();
  }, []);

  // Hnadlers
  const initHouseListings = async () => {
    const resp = await axios.post(
      "/admin/listHouses",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    let newHousesArr = [];
    for (let i = 0; i < resp.data.length; i++) {
      newHousesArr.push(new types.NewHouseAdObject(resp.data[i]));
      newHousesArr[i].faqs = JSON.parse(newHousesArr[i].faqs);
    }

    setHousesArr(newHousesArr);
  };

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
      {housesArr.map((house) => {
        return (
          <>
            <ViewHouseListing
              currHouse={house}
              setErrorModal={setErrorModal}
              isView={true}
            />
          </>
        );
      })}
    </>
  );
};

export default UsersViewHouse;
