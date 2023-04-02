import { createTheme } from "@mui/material";

const CustomTheme = createTheme({
    palette: {
        secondary: {
            main: "#686de0",
        },
    },
    typography: {
        fontFamily: `'Poppins', sans-serif`,
    },
});

export default CustomTheme;
