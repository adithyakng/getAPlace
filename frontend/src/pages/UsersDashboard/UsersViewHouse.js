import { useState, useEffect } from "react";
import axios from "axios";

import types from "../../types/types";
import ErrorModal from "../../ui-elements/ErrorModal/ErrorModal";
import ViewHouseListing from "../../components/ViewHouseListing/ViewHouseListing";

import TuneIcon from "@mui/icons-material/Tune";
import { IconButton } from "@mui/material";
import SortAndFilter from "../../components/SortAndFilter/SortAndFilter";

const UsersViewHouse = () => {
  // States
  const [housesArr, setHousesArr] = useState([]);
  const [errorModal, setErrorModal] = useState(new types.ErrorModalObject());
  const [showFilter, setShowFilter] = useState(false);

  // UseEffect
  useEffect(() => {
    initHouseListings();
  }, []);

  // Hnadlers
  const updateHousesArr = (data) => {
    let newHousesArr = [];
    for (let i = 0; i < data.length; i++) {
      newHousesArr.push(new types.NewHouseAdObject(data[i]));
      newHousesArr[i].faqs = JSON.parse(newHousesArr[i].faqs);
    }

    setHousesArr(newHousesArr);
  };

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

    updateHousesArr(resp.data);
  };

  return (
    <>
      <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />
      <IconButton
        sx={{ float: "right" }}
        aria-label={"user houses filter"}
        onClick={() => {
          setShowFilter(true);
        }}
      >
        <TuneIcon /> Filter
      </IconButton>
      <SortAndFilter
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        filterHousesHandler={updateHousesArr}
      />
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
