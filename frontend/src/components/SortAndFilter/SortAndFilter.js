import React, { useState, useEffect } from "react";

// Custom Modules

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import CustomMultiSelect from "../../ui-elements/CustomMultiSelect/CustomMultiSelect";
import CustomButton from "../../ui-elements/CustomButton/CustomButton";
import CustomSlider from "../../ui-elements/CustomSlider/CustomSlider";
import types from "../../types/types";

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

const SortAndFilter = ({ showFilter, setShowFilter, filterHousesHandler }) => {
  // States
  const [filtersOptions, setFilterOptions] = useState({});

  // UseEffect
  useEffect(() => {
    initFilterOptions();
  }, []);

  // Hnadlers
  const initFilterOptions = async () => {
    try {
      const userType = window.location.pathname.split("/")[1];
      const resp = await axios.post(
        `/${userType}/sortOptions`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      setFilterOptions(new types.FiltersObjectType({ ...resp.data.options }));
    } catch (e) {
      setFilterOptions(new types.FiltersObjectType());
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    let newData = { ...filtersOptions };
    newData[name] = newData[name].map((row) => {
      return { ...row, isSelected: false };
    });

    for (let i = 0; i < value.length; i++) {
      newData[name] = newData[name].map((row) => {
        if (row.label === value[i]) {
          row.isSelected = true;
        }

        return row;
      });
    }

    setFilterOptions(newData);
  };

  const fetchFilteredHousesHandler = async () => {
    try {
      const userType = window.location.pathname.split("/")[1];
      const bedroom = filtersOptions["bedroom"]
        .filter((childRow) => childRow.isSelected)
        .map((row) => row.label);
      const bathroom = filtersOptions["bathroom"]
        .filter((childRow) => childRow.isSelected)
        .map((row) => row.label);
      const features = filtersOptions["features"]
        .filter((childRow) => childRow.isSelected)
        .map((row) => row.label);
      const amenities = filtersOptions["amenities"]
        .filter((childRow) => childRow.isSelected)
        .map((row) => row.label);

      let arr = filtersOptions["defaultCarpetArea"];
      let step = Math.ceil((arr[1] - arr[0]) / 100);
      const carpetArea = filtersOptions["carpetArea"].map((row) => row * step);

      arr = filtersOptions["defaultCost"];
      step = Math.ceil((arr[1] - arr[0]) / 100);
      const cost = filtersOptions["cost"].map((row) => row * step);

      const resp = await axios.post(
        `/${userType}/sortHouses`,
        {
          bedroom,
          bathroom,
          features,
          amenities,
          carpetArea: carpetArea,
          cost: cost,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      filterHousesHandler(resp.data.houses);
    } catch (e) {
      filterHousesHandler(new types.FiltersObjectType());
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showFilter}
      onClose={() => {
        setShowFilter(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showFilter}>
        <Box sx={style}>
          <CustomMultiSelect
            label={"Bedrooms"}
            labelName={"bedroom"}
            id={"bedroom"}
            value={filtersOptions}
            setValue={changeHandler}
          />
          <CustomMultiSelect
            label={"Bathroom"}
            labelName={"bathroom"}
            id={"bathroom"}
            value={filtersOptions}
            setValue={changeHandler}
          />
          <CustomMultiSelect
            label={"Amenities"}
            labelName={"amenities"}
            id={"amenities"}
            value={filtersOptions}
            setValue={changeHandler}
          />
          <CustomMultiSelect
            label={"Features"}
            labelName={"features"}
            id={"features"}
            value={filtersOptions}
            setValue={changeHandler}
          />
          <CustomSlider
            label={"Carpet Area"}
            labelName={"carpetArea"}
            defaultLabelName={"defaultCarpetArea"}
            value={filtersOptions}
            setValue={setFilterOptions}
          />
          <CustomSlider
            label={"Cost"}
            labelName={"cost"}
            defaultLabelName={"defaultCost"}
            value={filtersOptions}
            setValue={setFilterOptions}
          />
          <CustomButton
            id="applyfilters"
            name="applyfilters"
            value="Apply Filters"
            clickHandler={fetchFilteredHousesHandler}
            key={`filter_houses_button`}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SortAndFilter;
