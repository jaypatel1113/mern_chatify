import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import Store from "./Redux/Store";
import CustomTheme from "./Theme/CustomTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Provider store={Store}>
            <ThemeProvider theme={CustomTheme}>
                <App />
            </ThemeProvider>
        </Provider>
    </Router>
);
