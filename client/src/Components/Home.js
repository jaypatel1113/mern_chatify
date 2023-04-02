import React from "react";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Login from "./UserComponents/Login";
import Register from "./UserComponents/Register";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`, "aria-controls": `full-width-tabpanel-${index}`,
    };
}

const Home = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                minWidth: "100vw",
            }}
        >
            <Box
                sx={{ bgcolor: "background.paper", width: 500, minHeight: 600 }}
            >
                <AppBar position="static" style={{ background: "#686de0" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        TabIndicatorProps={{
                            style: {
                                background: "#4834d4",
                                height: "3px",
                                borderRadius: "3px",
                            },
                        }}
                    >
                        <Tab
                            style={{ fontWeight: 700 }}
                            label="Login"
                            {...a11yProps(0)}
                        />
                        <Tab
                            style={{ fontWeight: 700 }}
                            label="Register"
                            {...a11yProps(1)}
                        />
                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Login />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Register />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel> */}
                </SwipeableViews>
            </Box>
        </Box>
    );
};

export default Home;
