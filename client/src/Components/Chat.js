import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ChatBox from "./ChatComponents/ChatBox";
import MyChats from "./ChatComponents/MyChats";
import TopMenu from "./ChatComponents/TopMenu";
import NotificationMenu from "./SubComponents/NotificationMenu";

import {fetchNotifications } from "../Redux/Actions/Notification";
import { deliverStatus, getStatus } from "../Redux/Actions/Status";

const Chat = () => {
    const [showChatList, setShowChatList] = useState(true);
    const [msg, setMsg] = useState([]);

    const { user } = useSelector((state) => state.user);
    const { selectedChat } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    useEffect(() => {
        selectedChat ? setShowChatList(false) : setShowChatList(true);
    }, [selectedChat]);
    
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchNotifications());
            await dispatch(deliverStatus(user._id));
            if(selectedChat) {
                await dispatch(getStatus(selectedChat?._id));
            }
        }
        fetchData();
    }, [msg, dispatch]);

    return (
        <>
            {user && (
                <Box sx={{ padding: 2, minHeight: "100vh", minWidth: "100vw" }}>
                    <TopMenu />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 8,
                        }}
                        px={4}
                    >
                        {showChatList ? <MyChats /> : <ChatBox setMsg={setMsg} msg={msg} />}
                    </Box>
                    <NotificationMenu />
                </Box>
            )}
        </>
    );
};

export default Chat;
