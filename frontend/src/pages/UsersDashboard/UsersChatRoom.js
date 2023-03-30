import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";

import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import CustomOutlinedInput from "../../ui-elements/CustomOutlinedInput/CustomOutlinedInput";

const UsersChatRoom = () => {
  const [chatRoomData, setChatRoomData] = useState([]);
  const [message, setMessage] = useState({ message: "" });

  const sendMessage = async () => {
    try {
      const chatRoomId = window.location.pathname.split("/")[3];
      await axios.post(
        `/chats?chatroomid=${chatRoomId}`,
        { ...message },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setChatRoomData([
        ...chatRoomData,
        { ...message, isSender: true, name: "Me" },
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

  const initData = async () => {
    try {
      const chatroomId = window.location.pathname.split("/")[3];
      const resp = await axios.get(`/chats?chatroomid=${chatroomId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setChatRoomData(resp.data.messages);
    } catch (e) {
      setChatRoomData([
        { message: "Hello Everyone", isSender: true, name: "Me" },
        { message: "Hello Sharan", isSender: false, name: "Shoeb" },
      ]);
    }
  };

  useEffect(() => {
    initData();
  }, []);

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
