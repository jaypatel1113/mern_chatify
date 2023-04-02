import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_LINK,
})

export const sendMessage = (content, chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "SEND_MESS_REQUEST",
        });

        const {data} = await client.post(`/api/message/`, {content, chatId});

        dispatch({
            type: "SEND_MESS_SUCCESS",
            payload: data.message,
        });
        return data;
        
    } catch (error) {
        dispatch({
            type: "SEND_MESS_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const fetchAllMessages = (chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "FETCH_ALL_MESS_REQUEST",
        });

        const {data} = await client.get(`/api/message/${chatId}`);

        dispatch({
            type: "FETCH_ALL_MESS_SUCCESS",
            payload: data.messages,
        });
    } catch (error) {
        dispatch({
            type: "FETCH_ALL_MESS_FAILURE",
            payload: error.response.data.message,
        });
    }
}