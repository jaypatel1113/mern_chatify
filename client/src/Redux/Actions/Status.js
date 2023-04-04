import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_LINK,
})

export const sentStatus = (chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "SENT_MSG_REQUEST",
        });

        await client.post(`/api/status`, {chatId});

        dispatch({
            type: "SENT_MSG_SUCCESS",
        });
        
    } catch (error) {
        dispatch({
            type: "SENT_MSG_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const deliverStatus = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: "DELIVER_MSG_REQUEST",
        });

        await client.put(`/api/status/deliver`, {userId});

        dispatch({
            type: "DELIVER_MSG_SUCCESS",
        });        
    } catch (error) {
        dispatch({
            type: "DELIVER_MSG_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const seenStatus = (userId, chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "SEEN_MSG_REQUEST",
        });

        await client.put(`/api/status/seen`, {userId, chatId});

        dispatch({
            type: "SEEN_MSG_SUCCESS",
        });        
    } catch (error) {
        dispatch({
            type: "SEEN_MSG_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const getStatus = (chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STATUS_REQUEST",
        });

        const {data} = await client.get(`/api/status?chatId=${chatId}`);

        dispatch({
            type: "GET_STATUS_SUCCESS",
            payload: data.status,
        });        
    } catch (error) {
        dispatch({
            type: "GET_STATUS_FAILURE",
            payload: error.response.data.message,
        });
    }
}