import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    selectedChat: null,
};

export const chatReducer = createReducer(initialState, {
    CHAT_ADD_REQUEST: (state) => {
        state.loading = true;
    },
    CHAT_ADD_SUCCESS: (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
        state.selectedChat = action.payload.chat;
    },
    CHAT_ADD_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    FETCH_ALL_CHATS_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_ALL_CHATS_SUCCESS: (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
        state.allChats = action.payload.allChats;
    },
    FETCH_ALL_CHATS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    GROUP_ADD_REQUEST: (state) => {
        state.loading = true;
    },
    GROUP_ADD_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.selectedChat = action.payload.chat;
    },
    GROUP_ADD_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    GROUP_RENAME_REQUEST: (state) => {
        state.loading = true;
    },
    GROUP_RENAME_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.selectedChat = action.payload.chat;
    },
    GROUP_RENAME_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    GROUP_ADD_MEMBER_REQUEST: (state) => {
        state.loading = true;
    },
    GROUP_ADD_MEMBER_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.selectedChat = action.payload.chat;
    },
    GROUP_ADD_MEMBER_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    GROUP_REMOVE_MEMBER_REQUEST: (state) => {
        state.loading = true;
    },
    GROUP_REMOVE_MEMBER_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.selectedChat = action.payload.chat;
    },
    GROUP_REMOVE_MEMBER_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    CHANGE_ACTIVE_CHAT: (state, action) => {
        state.selectedChat = action.payload;
    },
    
    
    CLEAR_ERROR: (state) => {
        state.error = null;
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null;
    },

    CLEAR_CHAT_STATES: () => initialState,
});