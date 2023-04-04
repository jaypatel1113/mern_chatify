import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allMessages: [],
};

export const messageReducer = createReducer(initialState, {
    SEND_MESS_REQUEST: (state) => {
        state.loading = true;
    },
    SEND_MESS_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    SEND_MESS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    FETCH_ALL_MESS_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_ALL_MESS_SUCCESS: (state, action) => {
        state.loading = false;
        state.allMessages = action.payload;
    },
    FETCH_ALL_MESS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    CLEAR_ERROR: (state) => {
        state.error = null;
    },

    CLEAR_MSG_STATES: () => initialState,
});