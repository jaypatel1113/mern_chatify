import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IoCreate } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import LoadingButton from "@mui/lab/LoadingButton";

import GroupSearchList from "../../ChatComponents/GroupSearchList";
import UserBadgeItem from "../../UserComponents/UserBadgeItem";
import SkeletonLoading from "../SkeletonLoading";

import { searchUsers } from "../../../Redux/Actions/User";
import { createGroupChat } from "../../../Redux/Actions/Chat";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    gap: 4,
    flexDirection: "column",
    padding: 5,
};

const GroupChatModel = ({ children }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // states
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [search, setSearch] = useState("");

    const { loading, searchResult } = useSelector((state) => state.user);

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

    const handleGroupAdd = (user) => {
        const isIncluded = selectedUsers.find((oneUser) => oneUser._id === user._id) ? true : false;
        if (isIncluded) {
            toast.warn("User Already Selected", { toastId: "warn_message" });
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
        setSearch("");
        dispatch({ type: "CLEAR_SEARCH_RESULT" });
    };
    const handleGroupRemove = (user) => {
        const filterUsers = selectedUsers.filter((oneUser) => oneUser._id !== user._id);
        setSelectedUsers(filterUsers);
    };

    const handleSubmit = () => {
        if(!selectedUsers || !groupName) {
            toast.warn("Fill all detials", {toastId: "warn_messages"});
            return;
        }
        let users = selectedUsers.map((user) => user._id);
        users = JSON.stringify(users);
        dispatch(createGroupChat(users, groupName));
    };

    useEffect(() => {
        setSearch("");
        setGroupName("");
        setSelectedUsers([]);
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
                        Create Group Chat
                    </Typography>

                    <Box sx={{ display: "grid", gap: 2 }}>
                        <TextField
                            color="secondary"
                            name="groupName"
                            value={groupName}
                            fullWidth
                            autoComplete="off"
                            placeholder="Group Name"
                            id="groupName"
                            onChange={(e) => setGroupName(e.target.value)}
                        />

                        <TextField
                            color="secondary"
                            name="search"
                            value={search}
                            fullWidth
                            autoComplete="off"
                            placeholder="Search user eg: John, Joe.."
                            id="search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedUsers?.map((user) => (
                                <UserBadgeItem
                                    user={user}
                                    key={user._id}
                                    handleFunction={() => handleGroupRemove(user)}
                                />
                            ))}
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
                        color="secondary"
                        onClick={handleSubmit}
                        style={{ fontWeight: 600 }}
                        sx={{
                            letterSpacing: 1.5,
                            width: 170,
                            alignSelf: "flex-end",
                        }}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<IoCreate />}
                    >
                        Create Chat
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

export default GroupChatModel;
