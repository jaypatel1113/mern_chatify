import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const GroupSearchList = (props) => {
    return (
        <Box
            sx={{
                width: "100%",
                background: "#f0f0f0",
                cursor: "pointer",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                "&:hover": {
                    background: "#686de0",
                    color: "#fff",
                },
            }}
            px={2}
            py={1}
            onClick={() => props.handleFunction()}
        >
            <Avatar alt={props.user.name} src={props.user.avtar?.url} sx={{ width: 28, height: 28 }} />
            <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                    {props.user.name}
                </Typography>
                {/* <Typography variant="subtitle2">{props.user.email}</Typography> */}
            </Box>
        </Box>
    );
};

export default GroupSearchList;
