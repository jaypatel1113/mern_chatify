import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import SideDrawer from "../SubComponents/SideDrawer";
import MenuAvtar from "../SubComponents/MenuAvtar";

const TopMenu = () => {
    return (
        <Box
            sx={{
                margin: "5px 16px 10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                background: "#efefef",
                padding: "5px 16px",
                borderRadius: 5
            }}
        >
            <SideDrawer />
            <Typography
                variant="h4"
                sx={{
                    textTransform: "uppercase",
                    color: "#686de0",
                    fontWeight: 700,
                    letterSpacing: 1,
                    cursor: "pointer"
                }}
            >
                Chatify
            </Typography>
            <MenuAvtar />
        </Box>
    );
};

export default TopMenu;
