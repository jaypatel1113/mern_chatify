import React from "react";
import { Avatar, Box, Tooltip } from "@mui/material";
import { HiOutlineCheckCircle, HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const MessageStatus = () => {
    const { userStatus } = useSelector((state) => state.status);

    return (
        <Box display={"flex"} gap={0.2} justifyContent={"flex-end"} alignItems={"center"}>
            {userStatus?.map((stat) =>
                stat.chatId.isGroupChat ? (
                    <Box key={stat._id} display={"flex"} alignItems={"center"} my={.1}>
                        {stat.status === "sent" && (
                                <Tooltip title={stat.user.name} arrow>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <HiOutlineCheckCircle />
                                    </div>
                                </Tooltip>
                            )
                        }
                        {stat.status === "delivered" && (
                                <Tooltip title={stat.user.name} arrow>
                                    <div style={{display: "flex", alignItems: "center"}} >
                                        <HiCheckCircle />
                                    </div>
                                </Tooltip>
                            )
                        }
                        {stat.status === "seen" && (
                            <Tooltip title={stat.user.name} arrow>
                                <Avatar
                                    alt={stat.user.name}
                                    src={stat.user?.avtar?.url}
                                    sx={{
                                        width: 14,
                                        height: 14,
                                        marginLeft: "auto",
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                ) : (
                    <Box key={stat._id}  my={.1}>
                        {stat.status === "sent" && (
                                <Tooltip title={"Sent"} arrow>
                                    <div>
                                        <HiOutlineCheckCircle />
                                    </div>
                                </Tooltip>
                            )
                        }
                        {stat.status === "delivered" && (
                                <Tooltip title={"Delivered"} arrow>
                                    <div>
                                        <HiCheckCircle />
                                    </div>
                                </Tooltip>
                            )
                        } 
                        {stat.status === "seen" && (
                            <Tooltip title={"seen"} arrow>
                                <Avatar
                                    alt={stat.user.name}
                                    src={stat.user?.avtar?.url}
                                    sx={{
                                        width: 14,
                                        height: 14,
                                        marginLeft: "auto",
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                )
            )}
        </Box>
    );
};

export default MessageStatus;
