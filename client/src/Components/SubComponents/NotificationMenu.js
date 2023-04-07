import React from "react";
import { Badge, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getSender } from "../../Config/ChatLogics";
import { changeSelectedChat } from "../../Redux/Actions/Chat";

const NotificationMenu = () => {
    const { user } = useSelector((state) => state.user);
    const { notifications } = useSelector((state) => state.notifications);

    const dispatch = useDispatch()

    const handleClick = (chat) => {
        dispatch(changeSelectedChat(chat));
    };

    return (            
            <Box
                sx={{
                    display: "flex",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 25,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                {
                    Array.isArray(notifications) ? 
                    <>
                        <Box>
                            {notifications?.length > 0 && (
                                <Badge
                                    badgeContent={notifications.length}
                                    color="secondary"
                                    fontWeight={900}
                                >
                                <Box
                                    sx={{
                                        background: "#DEE3FC",
                                        padding: "10px 20px",
                                        borderRadius: 5,
                                        fontWeight: 800,
                                        color: "#7E89FD",
                                    }}
                                >
                                    Unread {notifications.length > 1 ? "chats" : "chat"}
                                </Box>
                                </Badge>
                            )}
                        </Box>
                        <Box
                            sx={{
                                height: "50px",
                                width: "5px",
                                background: "#23395d",
                                borderRadius: 3,
                            }}
                        />
                        <Box sx={{ display: "flex", gap: 2 }}>
                            {notifications?.map((noti) => (
                                    <Box key={noti._id}>
                                        {noti.chatId.isGroupChat ? (
                                            <Badge
                                                badgeContent={noti.count}
                                                sx={{
                                                    "& .MuiBadge-badge": {
                                                        color: "#fec5e5",
                                                        fontWeight: 900,
                                                        backgroundColor: "#fc46aa"
                                                    }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        background: "#fec5e5",
                                                        padding: "10px 20px",
                                                        borderRadius: 5,
                                                        fontWeight: 800,
                                                        color: "#fc46aa",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => handleClick(noti.chatId)}
                                                >
                                                    {noti.chatId.chatName}
                                                </Box>
                                            </Badge>
                                        ) : (
                                            <Badge
                                                badgeContent={noti.count}
                                                sx={{
                                                    "& .MuiBadge-badge": {
                                                        color: "#d2ff9a",
                                                        fontWeight: 900,
                                                        backgroundColor: "#022e1e"
                                                    }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        background: "#d2ff9a",
                                                        padding: "10px 20px",
                                                        borderRadius: 5,
                                                        fontWeight: 800,
                                                        color: "#022e1e",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => handleClick(noti.chatId)}
                                                >
                                                    {
                                                        getSender(user, noti?.chatId?.users).split(" ")[0]
                                                    }
                                                </Box>
                                            </Badge>
                                        )}
                                    </Box>
                                ))}
                        </Box> 
                    </> 
                    :
                    <Box sx={{
                        background: "#DEE3FC",
                        padding: "20px 30px",
                        borderRadius: 3,
                        fontWeight: 800,
                        color: "#7E89FD",
                    }}>
                        No Unread Messages
                    </Box>
                }
            </Box>

    );
};

export default NotificationMenu;
