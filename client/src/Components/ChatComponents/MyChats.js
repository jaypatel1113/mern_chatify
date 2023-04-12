import React, { useEffect } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedChat, fetchAllChats } from "../../Redux/Actions/Chat";
import { MdAdd } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

import GroupChatModel from "../SubComponents/Models/GroupChatModel";
import DisplayDateTime from "../SubComponents/DisplayDateTime";
import LoadingChatAnimation from "../SubComponents/Animations/LoadingChatAnimation";
import { getSender, getSenderAvtarUrl } from "../../Config/ChatLogics";
import { deliverStatus } from "../../Redux/Actions/Status";
import { decryptMsg } from "../../Config/AES";


const MyChats = () => {
    const { user, notifications } = useSelector((state) => state.user);
    const { selectedChat, loading, allChats, messages } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const handleClick = (chat) => {
        dispatch(changeSelectedChat(chat));
    };

    useEffect(() => {
        const fetchChats = async () => {
            dispatch(fetchAllChats());
        };
        fetchChats();
    }, [selectedChat, notifications, messages, dispatch]);

    useEffect(() => {
        dispatch(deliverStatus(user._id));
    }, [user._id, dispatch]);

    return (
        <>
            {loading ? <LoadingChatAnimation /> : (
                <Box
                    sx={{
                        width: 500,
                        height: 500,
                        textAlign: "center",
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
                        }}
                        px={5}
                        py={3}
                    >
                        <Box
                            sx={{
                                fontSize: 25,
                                fontWeight: 700,
                                color: "#686de0",
                            }}
                        >
                            My Chats
                        </Box>

                        <GroupChatModel>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ fontWeight: 600, height: 40 }}
                                sx={{ letterSpacing: 1.5 }}
                                startIcon={<MdAdd />}
                            >
                                Add Group Chat
                            </Button>
                        </GroupChatModel>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 5,
                            width: "100%",
                            height: "100%",
                            overflowY: "hidden",
                        }}
                    >
                        {allChats?.length > 0 ? (
                            <Box
                                sx={{
                                    overflowY: "scroll",
                                    display: "grid",
                                    gap: 2,
                                }}
                            >
                                {allChats?.map((chat) => (
                                    <Box
                                        onClick={() => handleClick(chat)}
                                        sx={{
                                            cursor: "pointer",
                                            background: "#efefef",
                                            color: "#000",
                                            borderRadius: 3,
                                            textAlign: "left",
                                            display: "flex",
                                            gap: 3,
                                            alignItems: "center",
                                            "&:hover": {
                                                background: "#686de0",
                                                color: "#fff",
                                            },
                                        }}
                                        px={3}
                                        py={2}
                                        key={chat._id}
                                    >
                                        {!chat.isGroupChat ? (
                                            <Avatar
                                                alt={chat.chatName}
                                                src={getSenderAvtarUrl(user, chat?.users)}
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    color: "#000",
                                                    background: "none",
                                                }}
                                            />
                                        ) : (
                                            <HiUserGroup
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    transform: "scale(0.9)",
                                                }}
                                            />
                                        )}

                                        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    {!chat.isGroupChat ? getSender(user, chat?.users) : chat.chatName}
                                                </Typography>
                                                {
                                                    chat?.latestMessage && (

                                                        <Typography fontSize={12}>
                                                            {
                                                                chat?.latestMessage?.sender._id === user._id 
                                                                ? <>You </>
                                                                : <>{chat?.latestMessage?.sender.name.split(" ")[0]} </>
                                                            }
                                                            :&nbsp;
                                                            {
                                                                decryptMsg(chat?.sharedSecketKey, chat?.latestMessage?.content).length > 23
                                                                ? `${decryptMsg(chat?.sharedSecketKey, chat?.latestMessage?.content).slice(0, 23)}...` 
                                                                : decryptMsg(chat?.sharedSecketKey, chat?.latestMessage?.content) 
                                                            }
                                                        </Typography>
                                                    )
                                                }
                                            </Box>

                                            <Box>
                                                {chat?.latestMessage && (
                                                    <Typography fontSize={10}>
                                                        <DisplayDateTime 
                                                            time={chat?.latestMessage?.createdAt} 
                                                            fromNow={true} 
                                                        />
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        color: "#aaa",
                                        letterSpacing: 1,
                                    }}
                                    my={9}
                                >
                                    Search User <br /> and <br /> Start
                                    Conversation
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box>
                        {notifications?.length > 0 && (
                            <>
                                {notifications.map((noti) => (
                                    <>
                                        <Box key={noti._id}>
                                        {
                                            noti.chat.isGroupChat ? 
                                                <Box>
                                                        New message in &nbsp;
                                                        <span style={{fontWeight: 800}}>{noti.chat.chatName}</span> 
                                                        &nbsp; Group
                                                </Box> : 
                                                <Box>
                                                    New message from &nbsp;
                                                    <span style={{fontWeight: 800}}>{getSender(user, noti?.chat?.users)}</span>
                                                </Box>
                                        }
                                        </Box>
                                    </>
                                ))}
                            </>
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default MyChats;
