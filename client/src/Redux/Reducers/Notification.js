import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

export const notificationReducer = createReducer(initialState, {
    GET_NOTIFICATION_REQUEST: (state) => {
        state.loading = true;
    },
    GET_NOTIFICATION_SUCCESS: (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
    },
    GET_NOTIFICATION_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    SEND_NOTIFICATION_REQUEST: (state) => {
        state.loading = true;
    },
    SEND_NOTIFICATION_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    SEND_NOTIFICATION_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    DELETE_NOTIFICATION_REQUEST: (state) => {
        state.loading = true;
    },
    DELETE_NOTIFICATION_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DELETE_NOTIFICATION_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    CLEAR_ERROR: (state) => {
        state.error = null;
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null;
    },
    
    CLEAR_NOTIFICATION_STATES: () => initialState,
});