import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import ChatBox from "./ChatComponents/ChatBox";
import MyChats from "./ChatComponents/MyChats";
import TopMenu from "./ChatComponents/TopMenu";

const Chat = () => {
    const [showChatList, setShowChatList] = useState(true);

    const { user } = useSelector((state) => state.user);
    const { selectedChat } = useSelector((state) => state.chat);

    useEffect(() => {
        selectedChat ? setShowChatList(false) : setShowChatList(true);
    }, [selectedChat]);

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
                        {showChatList ? <MyChats /> : <ChatBox />}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Chat;
