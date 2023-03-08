import axios from "axios";
import React, { useEffect, useState } from "react";
import Parse from "html-react-parser";

const UsersFAQs = () => {
  const [faqData, setFaqData] = useState("");

  const initData = async () => {
    try {
      const houseId = window.location.pathname.split("/")[3];
      const resp = await axios.get(`/house/getFaq?id=${houseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setFaqData(JSON.parse(resp.data.faq));
    } catch (e) {
      setFaqData(
        "<h3>No Frequently Asked Questions available for this listing.</h3>"
      );
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return <div>{Parse(faqData)}</div>;
};

export default UsersFAQs;
