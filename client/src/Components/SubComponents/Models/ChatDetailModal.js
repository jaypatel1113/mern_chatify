import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDriveFileRenameOutline, MdOutlineTransitEnterexit } from "react-icons/md";
import LoadingButton from "@mui/lab/LoadingButton";

import GroupSearchList from "../../ChatComponents/GroupSearchList";
import UserBadgeItem from "../../UserComponents/UserBadgeItem";
import SkeletonLoading from "../SkeletonLoading";

import { searchUsers } from "../../../Redux/Actions/User";
import { addToGroup, changeSelectedChat, removeFromGroup, renameGroupChat } from "../../../Redux/Actions/Chat";
import { fetchAllMessages } from "../../../Redux/Actions/Message";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    gap: 4,
    flexDirection: "column",
    padding: 5,
};

const GroupDetailModel = ({ children }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // states
    const [groupName, setGroupName] = useState("");
    const [search, setSearch] = useState("");

    const { loading: chatLoading, selectedChat } = useSelector((state) => state.chat);
    const { loading, searchResult, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    
    useEffect(() => {
        let searchRsltTimeout;
        if(search) {
            searchRsltTimeout = setTimeout(() => {
                dispatch(searchUsers(search));
            }, 1000);
        }

        return () => clearTimeout(searchRsltTimeout);
    }, [search, dispatch]);

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) return dispatch({ type: "CLEAR_SEARCH_RESULT" });
    };

    const handleGroupAdd = (selectedUser) => {
        const isIncluded = selectedChat.users.find((user1) => user1._id === selectedUser._id);
        if (isIncluded) {
            toast.warn("User Already in Group", { toastId: "remove_msg" });
            return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast.error("Only admin can Perform actions", {
                toastId: "admin_msg",
            });
            return;
        }
        dispatch({ type: "CLEAR_SEARCH_RESULT" });
        dispatch(addToGroup(selectedChat._id, selectedUser._id));
    };
    const handleGroupRemove = async (selectedUser) => {
        if (
            selectedChat.groupAdmin._id !== user._id &&
            user._id !== selectedUser._id
        ) {
            toast.error("Only admin can Perform actions", {
                toastId: "admin_msg",
            });
            return;
        } else {
            await dispatch({ type: "CLEAR_SEARCH_RESULT" });
            await dispatch(removeFromGroup(selectedChat._id, selectedUser._id));
        }
        
        if (user._id === selectedUser._id) {
            await dispatch(changeSelectedChat(null));
        }
        dispatch(fetchAllMessages(selectedChat._id));
    };
    const handleRename = () => {
        if (!groupName) {
            toast.warn("Enter name to rename", { toastId: "rename" });
            return;
        }
        dispatch({ type: "CLEAR_SEARCH_RESULT" });
        dispatch(renameGroupChat(selectedChat._id, groupName));
    };

    useEffect(() => {
        setSearch("");
        setGroupName("");
        dispatch({ type: "CLEAR_SEARCH_RESULT" });
    }, [open, dispatch]);

    return (
        <Box>
            <Box onClick={handleOpen}>{children}</Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        fontWeight={700}
                    >
                        {selectedChat?.chatName}
                    </Typography>

                    <Box sx={{ display: "grid", gap: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <TextField
                                color="primary"
                                name="groupName"
                                value={groupName}
                                autoComplete="off"
                                placeholder="Group Name"
                                id="groupName"
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <LoadingButton
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRename()}
                                style={{ fontWeight: 600 }}
                                sx={{ letterSpacing: 1.5 }}
                                loading={chatLoading}
                                loadingPosition="start"
                                startIcon={<MdDriveFileRenameOutline />}
                            >
                                Rename
                            </LoadingButton>
                        </Box>

                        <TextField
                            color="secondary"
                            name="search"
                            value={search}
                            fullWidth
                            autoComplete="off"
                            placeholder="Add user eg: John, Joe.."
                            id="search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedChat?.users?.map((userOne) =>
                                user._id !== userOne._id && (
                                    <UserBadgeItem
                                        user={userOne}
                                        key={userOne._id}
                                        handleFunction={() =>handleGroupRemove(userOne)}
                                    />
                                )
                            )}
                        </Box>

                        {loading ? <SkeletonLoading /> : (
                            searchResult?.slice(0, 4).map((user) => (
                                <GroupSearchList
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleGroupAdd(user)}
                                />
                            ))
                        )}
                    </Box>
                    <LoadingButton
                        variant="contained"
                        color="error"
                        onClick={() => handleGroupRemove(user)}
                        style={{ fontWeight: 600 }}
                        sx={{
                            letterSpacing: 1.5,
                            width: 170,
                            alignSelf: "flex-end",
                        }}
                        loading={chatLoading}
                        loadingPosition="start"
                        startIcon={<MdOutlineTransitEnterexit />}
                    >
                        Leave Group
                    </LoadingButton>

                    <Box
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: 45,
                            right: "9%",
                            cursor: "pointer",
                        }}
                    >
                        <AiFillCloseCircle style={{ color: "#f25b57", fontSize: "1.6rem" }}/>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default GroupDetailModel;
