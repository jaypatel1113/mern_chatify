import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonLoading = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Skeleton style={{height: "50px"}} />
            <Skeleton style={{height: "50px"}} animation="wave" />
        </Box>
    );
};

export default SkeletonLoading;
