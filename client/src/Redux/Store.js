import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./Reducers/User";
import { chatReducer } from "./Reducers/Chat";
import { messageReducer } from "./Reducers/Message";

const Store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        message: messageReducer,
    },
});

export default Store;
