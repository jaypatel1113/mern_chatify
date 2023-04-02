import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_LINK,
})

export const createChat = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: "CHAT_ADD_REQUEST",
        });

        const {data} = await client.post(`/api/chat/create`, {userId});

        dispatch({
            type: "CHAT_ADD_SUCCESS",
            payload: { chat: data.chat, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "CHAT_ADD_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const fetchAllChats = () => async (dispatch) => {
    try {
        dispatch({
            type: "FETCH_ALL_CHATS_REQUEST",
        });

        const {data} = await client.get(`/api/chat/fetch`);

        dispatch({
            type: "FETCH_ALL_CHATS_SUCCESS",
            payload: { allChats: data.chat, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "FETCH_ALL_CHATS_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const changeSelectedChat = (selectedChat) => async (dispatch) => {
    try {
        dispatch({
            type: "CHANGE_ACTIVE_CHAT",
            payload: selectedChat,
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const createGroupChat = (users, name) => async (dispatch) => {
    try {
        dispatch({
            type: "GROUP_ADD_REQUEST",
        });

        const {data} = await client.post(`/api/chat/group/create`, {users, name});

        dispatch({
            type: "GROUP_ADD_SUCCESS",
            payload: { chat: data.chat, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "GROUP_ADD_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const renameGroupChat = (chatId, chatName) => async (dispatch) => {
    try {
        dispatch({
            type: "GROUP_RENAME_REQUEST",
        });

        const {data} = await client.put(`/api/chat/group/rename`, {chatId, chatName});

        dispatch({
            type: "GROUP_RENAME_SUCCESS",
            payload: { chat: data.chat, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "GROUP_RENAME_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const addToGroup = (chatId, userId) => async (dispatch) => {
    try {
        dispatch({
            type: "GROUP_ADD_MEMBER_REQUEST",
        });

        const {data} = await client.put(`/api/chat/group/add`, {chatId, userId});

        dispatch({
            type: "GROUP_ADD_MEMBER_SUCCESS",
            payload: { chat: data.chat, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "GROUP_ADD_MEMBER_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const removeFromGroup = (chatId, userId) => async (dispatch) => {
    try {
        dispatch({
            type: "GROUP_REMOVE_MEMBER_REQUEST",
        });

        const {data} = await client.put(`/api/chat/group/remove`, {chatId, userId});

        dispatch({
            type: "GROUP_REMOVE_MEMBER_SUCCESS",
            payload: { chat: data.chat, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "GROUP_REMOVE_MEMBER_FAILURE",
            payload: error.response.data.message,
        });
    }
}