import axios from "axios";
import React, { useEffect, useState } from "react";
import Parse from "html-react-parser";

const UsersFAQs = () => {
  const [faqData, setFaqData] = useState("");

  const initData = async () => {
    try {
      const houseId = window.location.pathname.split("/")[2];
      const resp = await axios.post(
        "/users/faqs",
        { id: houseId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setFaqData(resp.data);
    } catch (e) {
      setFaqData(
        "<h3>No Frequently Asked Questions available for this listing.</h3>"
      );
      console.log(e);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return <div>{Parse(faqData)}</div>;
};

export default UsersFAQs;
