import React from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = (props) => {
    return (
        <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ textTransform: "none" }}
            endIcon={<CloseIcon />}
            style={{ borderRadius: 50 }}
            onClick={() => props.handleFunction()}
        >
            {props.user.name.split(" ")[0]}
        </Button>
    );
};

export default UserBadgeItem;
