import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar, Box, Tooltip } from "@mui/material";

import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../Config/ChatLogics";
import { decryptMsg } from "../../Config/AES";
import DisplayDateTime from "../SubComponents/DisplayDateTime";

const ScrollableChat = (props) => {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            {props.messages && props.secretKey && (
                <ScrollableFeed>
                    {props?.messages?.map((msg, i) => (
                        <Box
                            key={msg._id}
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                            style={{ marginTop: isSameUser(props?.messages, msg, i, user._id) ? 5 : 10 }}
                        >
                            {(isSameSender(props?.messages, msg, i, user._id) ||
                                isLastMessage(props?.messages, i, user._id)) && (
                                <Tooltip title={msg.sender?.name} arrow>
                                    <Avatar
                                        alt={msg.sender?.name}
                                        src={msg.sender?.avtar?.url}
                                        sx={{ width: 26, height: 26 }}
                                    />
                                </Tooltip>
                            )}

                            <span
                                style={{
                                    background: `${ msg.sender._id === user._id ? "#BEE3F8" : "#B9F5D0" }`,
                                    marginLeft: isSameSenderMargin(props?.messages, msg, i, user._id),
                                    borderRadius: "10px",
                                    padding: "8px 15px",
                                    maxWidth: "75%",
                                    minWidth: "100px",
                                    display: "flex",
                                    wordWrap: "break-word",
                                    flexDirection: "column",
                                    gap: 2,
                                    fontSize: 14,
                                }}
                            >
                                {/* {msg.content} */}
                                {decryptMsg(props?.secretKey, msg.content)}

                                <span
                                    style={{
                                        fontSize: "9px",
                                        alignSelf: "flex-end",
                                        fontWeight: 600,
                                    }}
                                >
                                    <DisplayDateTime time={msg?.createdAt} />
                                </span>
                            </span>
                        </Box>
                    ))}
                </ScrollableFeed>
            )}
        </>
    );
};

export default ScrollableChat;
