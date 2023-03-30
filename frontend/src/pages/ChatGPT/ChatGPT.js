import axios from "axios";
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import CustomOutlinedInput from "../../ui-elements/CustomOutlinedInput/CustomOutlinedInput";

const UsersChatRoom = () => {
  const [chatRoomData, setChatRoomData] = useState([
    {
      message: "Hello! I am GetAPlace ChatBot. How can I help you?",
      isSender: false,
      name: "Get A Place Bot",
    },
  ]);
  const [message, setMessage] = useState({ message: "" });

  const sendMessage = async () => {
    try {
      const resp = await axios.post(
        `/users/chatGpt`,
        { ...message },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setChatRoomData([
        ...chatRoomData,
        { message: message.message, isSender: true, name: "Me" },
        {
          message: resp.data.message,
          isSender: false,
          name: "Get A Place Bot",
        },
      ]);
      setMessage({ message: "" });
    } catch (e) {
      setMessage({ message: "" });
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMessage({ [name]: value });
  };

  return (
    <>
      <div className="chat_container">
        {chatRoomData.map((row) => {
          return (
            <>
              <p
                className={`chat_message ${
                  row.isSender ? "sender" : "receiver"
                }`}
              >
                {row.name + ":"}
                <br />
                {row.message}
              </p>
            </>
          );
        })}
      </div>
      <div className="chat_input">
        <CustomOutlinedInput
          helperText={""}
          id={"message"}
          name={"message"}
          label={"Enter your message"}
          value={message}
          type={"text"}
          setValue={changeHandler}
          margin="0% 0% 0% 1.5%"
          width="99%"
          children={
            <IconButton
              aria-label="send message"
              onClick={sendMessage}
              edge="end"
            >
              <SendIcon />
            </IconButton>
          }
        />
      </div>
    </>
  );
};

export default UsersChatRoom;
