import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./Reducers/User";
import { chatReducer } from "./Reducers/Chat";
import { messageReducer } from "./Reducers/Message";
import { notificationReducer } from "./Reducers/Notification";
import { statusReducer } from "./Reducers/Status";

const Store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        message: messageReducer,
        notifications: notificationReducer,
        status: statusReducer,
    },
});

export default Store;
