import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    initalLoading: false,
};

export const userReducer = createReducer(initialState, {
    LOAD_USER_REQUEST: (state) => {
        state.initalLoading = true;
        state.isAuthenticated = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
        state.initalLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    LOAD_USER_FAILURE: (state, action) => {
        state.initalLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    REGISTER_REQUEST: (state) => {
        state.loading = true;
    },
    REGISTER_SUCCESS: (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.message = action.payload;
    },
    REGISTER_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    LOGIN_REQUEST: (state) => {
        state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    LOGIN_FAILURE: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    LOGOUT_REQUEST: (state) => {
        state.loading = true;
        state.isLogout = false;
    },
    LOGOUT_SUCCESS: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isLogin = false;
        state.message = action.payload;
        state.isLogout = true;
    },
    LOGOUT_FAILURE: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isLogout = false;
    },

    SEARCH_REQUEST: (state) => {
        state.loading = true;
    },
    SEARCH_SUCCESS: (state, action) => {
        state.loading = false;
        state.searchResult = action.payload.users;
        state.message = action.payload.message;
    },
    SEARCH_FAILURE: (state, action) => {
        state.loading = false;
        state.searchResult = [];
        state.error = action.payload;
    },
    
    
    CLEAR_SEARCH_RESULT: (state) => {
        state.searchResult = [];
    },


    CLEAR_ERROR: (state) => {
        state.error = null;
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null;
    },
});
