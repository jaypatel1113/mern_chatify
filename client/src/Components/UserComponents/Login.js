import React, { useState } from "react";
import { Button, InputAdornment, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RiLoginBoxFill, RiLockPasswordFill } from "react-icons/ri";
import { MdLockReset, MdEmail } from "react-icons/md";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { loginUser } from "../../Redux/Actions/User";

const Login = () => {
    // for password
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const [data, setData] = useState({});

    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(data));
    };

    return (
        <>
            <Typography
                variant="h4"
                mb={3}
                align="center"
                color="secondary"
                style={{ fontWeight: 600 }}
                sx={{ letterSpacing: 1 }}
            >
                LOGIN
            </Typography>
            <Box
                sx={{
                    width: 500,
                    maxWidth: "100%",
                }}
                mb={2}
                px={3}
            >
                <TextField
                    color="secondary"
                    name="email"
                    value={data.email || ""}
                    fullWidth
                    focused
                    label="Email"
                    id="email"
                    onChange={handleOnChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MdEmail style={{ color: "#686de0" }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: 500,
                    maxWidth: "100%",
                }}
                px={3}
            >
                <TextField
                    color="secondary"
                    name="password"
                    value={data.password || ""}
                    fullWidth
                    focused
                    label="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleOnChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <RiLockPasswordFill style={{ color: "#686de0" }}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff style={{ color: "#686de0" }}/>
                                    ) : (
                                        <Visibility style={{ color: "#686de0" }}/>
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box mt={4} px={3} display="flex" justifyContent="space-between">
                <LoadingButton
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    style={{ fontWeight: 600 }}
                    sx={{ letterSpacing: 1.5 }}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<RiLoginBoxFill />}
                >
                    Login
                </LoadingButton>
                <Button
                    variant="contained"
                    color="warning"
                    loading={true}
                    sx={{ letterSpacing: 1.5 }}
                    onClick={() => setData({})}
                    startIcon={<MdLockReset />}
                >
                    Reset
                </Button>
            </Box>
        </>
    );
};

export default Login;
