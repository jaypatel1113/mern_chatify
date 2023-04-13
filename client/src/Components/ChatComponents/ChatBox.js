import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Box, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IoCaretBackCircle } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

import ProfileModal from "../SubComponents/Models/ProfileModal";
import GroupDetailModel from "../SubComponents/Models/ChatDetailModal";

import ScrollableChat from "./ScrollableChat";
import TypingAnimation from "../SubComponents/Animations/TypingAnimation";
import LoadingMessageAnimation from "../SubComponents/Animations/LoadingMessageAnimation";

import { fetchAllMessages, sendMessage } from "../../Redux/Actions/Message";
import { changeSelectedChat } from "../../Redux/Actions/Chat";
import { getSender, getSenderFull } from "../../Config/ChatLogics";
import { deleteNotification, fetchNotifications, sendNotification } from "../../Redux/Actions/Notification";
import { getStatus, seenStatus, sentStatus } from "../../Redux/Actions/Status";
import { encryptMsg } from "../../Config/AES";
import MessageStatus from "./MessageStatus";


const ENDPOINT = process.env.REACT_APP_BACKEND_LINK;
var socket, selectedChatCompare;

const ChatBox = ({setMsg, msg}) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [disableTextField, setDisableTextField] = useState(false);
    const [decodedMessages, setDecodedMessages] = useState([]);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { selectedChat, loading } = useSelector((state) => state.chat);
    const { allMessages } = useSelector((state) => state.message);

    // socket initiallization
    useEffect(() => {
        socket = io(ENDPOINT);
    
        // create socket for specific user
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));

        // typing handler
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

    }, [user]);
    
    
    useEffect(() => {
        const fetchData = async () => {
            if(selectedChat !== null) {
                await dispatch(fetchAllMessages(selectedChat?._id));
                await dispatch(seenStatus(user._id, selectedChatCompare._id));
                socket.emit("join chat", selectedChat._id);
                await dispatch(getStatus(selectedChatCompare?._id));
            }
            selectedChatCompare = selectedChat;
        }
        fetchData();
    }, [selectedChat, messages, dispatch]);

    useEffect(()=>{
        dispatch(getStatus(selectedChat?._id));
    }, [isTyping, messages, selectedChat, msg, dispatch]);

    useEffect(() => {
        if(selectedChat !== null) {
            selectedChatCompare = selectedChat;
        }
        const fetchData = async () => {
            if(selectedChatCompare?._id) {
                await dispatch(deleteNotification(selectedChatCompare._id));
                await dispatch(fetchNotifications());
            }
        }
        fetchData();
    }, [selectedChat?._id, dispatch, selectedChat]);


    const handleClick = () => {
        dispatch(changeSelectedChat(null));
    };
    const sendMessageToUser = async (e) => {
        if(e.key === "Enter" && newMessage) {
            setDisableTextField(true);
            socket.emit("stop typing", selectedChat._id);

            setNewMessage("");
            const encMsg = encryptMsg(selectedChat?.sharedSecketKey, newMessage);
            const data = await dispatch(sendMessage(encMsg, selectedChat._id));
            setMessages([...messages, newMessage]);

            // sent msg fetch from store and sent to server
            socket.emit("new message", data.message)
            setDisableTextField(false);

            dispatch(sendNotification(selectedChatCompare._id));
            dispatch(sentStatus(selectedChatCompare._id));
        }
    };
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        
        // typing indicator logic
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        // debouncing like function which emits stop typing after 3 sec of stop typing
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
        }
        }, timerLength);
    };
    

    
    useEffect(() => {
        socket.on("message recieved", (newMessageReceived) => {
            // if chat is not selected or doesn't match current chat
            if (
                selectedChatCompare === null || 
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                // give notification
                setMsg([...msg, newMessageReceived.chat._id]);
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        })
    })


    return (
        <Box
            sx={{
                width: 500,
                height: 500,
                display: "flex",
                flexDirection: "column",
                marginTop: -4,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                px={5}
                py={1}
            >
                <IconButton
                    color="secondary"
                    aria-label="add an alarm"
                    style={{ fontWeight: 600, fontSize: 35 }}
                    sx={{ letterSpacing: 1.5 }}
                    onClick={handleClick}
                >
                    <IoCaretBackCircle />
                </IconButton>

                <Box sx={{ fontSize: 25, fontWeight: 700, color: "#686de0" }}>
                    {selectedChat !== null && !selectedChat?.isGroupChat
                        ? getSender(user, selectedChat?.users)
                        : selectedChat?.chatName}
                </Box>

                {selectedChat !== null && !selectedChat?.isGroupChat && (
                    <ProfileModal
                        user={getSenderFull(user, selectedChat?.users)}
                    >
                        <IconButton
                            color="secondary"
                            style={{ fontWeight: 600, fontSize: 30 }}
                            sx={{ letterSpacing: 1.5 }}
                        >
                            <FaEye />
                        </IconButton>
                    </ProfileModal>
                )}
                {selectedChat !== null && selectedChat?.isGroupChat && (
                    <GroupDetailModel user={selectedChat?.users}>
                        <IconButton
                            color="secondary"
                            style={{ fontWeight: 600, fontSize: 30 }}
                            sx={{ letterSpacing: 1.5 }}
                        >
                            <FaEye />
                        </IconButton>
                    </GroupDetailModel>
                )}
            </Box>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    background: "#efefef",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    overflowY: "hidden",
                    gap: 2,
                }}
                p={3}
            >
                <Box sx={{ height: "100%", overflowY: "scroll" }}>
                    {loading ? (
                        <LoadingMessageAnimation />
                    ) : (
                        <ScrollableChat messages={allMessages} secretKey={selectedChat?.sharedSecketKey} />
                    )}
                </Box>
                <Box>
                    {isTyping ? <TypingAnimation /> : <></>}
                    <MessageStatus />
                    <TextField
                        className="inputRounded"
                        color="secondary"
                        name="newMessage"
                        value={newMessage}
                        fullWidth
                        autoFocus
                        autoComplete="off"
                        placeholder="Enter Message and click Enter"
                        id="newMessage"
                        onChange={typingHandler}
                        onKeyDown={sendMessageToUser}
                        disabled={disableTextField}
                        style={{ opacity: disableTextField ? 0 : 1 }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ChatBox;
