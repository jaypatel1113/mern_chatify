import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import SearchLoading from "./SearchLoading";
import UserListItem from "../UserComponents/UserListItem";

import { searchUsers } from "../../Redux/Actions/User";
import { createChat, fetchAllChats } from "../../Redux/Actions/Chat";

const SideDrawer = () => {
    const [state, setState] = useState({ top: false });

    // search states
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    const { searchResult, loading, selectedChat } = useSelector((state) => state.user);

    const handleSearch = () => {
        dispatch(searchUsers(search));
    };

    const createNewChat = (userId) => {
        dispatch(createChat(userId));
    };

    useEffect(() => {
        dispatch(fetchAllChats());
    }, [selectedChat, dispatch])
    

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 370,
            }}
            role="presentation"
            px={3}
            py={3}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                m={"0 0 20px 0"}
            >
                <TextField
                    color="secondary"
                    name="search"
                    value={search}
                    id="search"
                    placeholder="Search User"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}
                    style={{ fontWeight: 600, height: 40 }}
                    sx={{ letterSpacing: 1.5 }}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<PersonSearchIcon />}
                >
                    Go
                </LoadingButton>
            </Box>
            <Divider />
            <Box
                m={"20px 0 0 0"}
                style={{ overflowX: "auto" }}
                onClick={toggleDrawer(anchor, false)}
            >
                {/* search result */}
                {loading ? <SearchLoading /> : (
                    searchResult?.map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={() => createNewChat(user._id)}
                        />
                    ))
                )}
            </Box>
        </Box>
    );

    return (
        <div>
            {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Tooltip title="Search User" arrow>
                        <Button
                            onClick={toggleDrawer(anchor, true)}
                            startIcon={<SearchIcon />}
                            color="secondary"
                            sx={{ fontWeight: 700 }}
                        >
                            Search
                        </Button>
                    </Tooltip>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default SideDrawer;
