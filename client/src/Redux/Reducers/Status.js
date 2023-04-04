import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userStatus: [],
};

export const statusReducer = createReducer(initialState, {
    SENT_MSG_REQUEST: (state) => {
        state.loading = true;
    },
    SENT_MSG_SUCCESS: (state, action) => {
        state.loading = false;
    },
    SENT_MSG_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    DELIVER_MSG_REQUEST: (state) => {
        state.loading = true;
    },
    DELIVER_MSG_SUCCESS: (state, action) => {
        state.loading = false;
    },
    DELIVER_MSG_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    SEEN_MSG_REQUEST: (state) => {
        state.loading = true;
    },
    SEEN_MSG_SUCCESS: (state, action) => {
        state.loading = false;
    },
    SEEN_MSG_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    GET_STATUS_REQUEST: (state) => {
        state.loading = true;
    },
    GET_STATUS_SUCCESS: (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
    },
    GET_STATUS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    CLEAR_ERROR: (state) => {
        state.error = null;
    },
    // CLEAR_MESSAGE: (state) => {
    //     state.message = null;
    // },

    CLEAR_STATUS_STATES: () => initialState,
});