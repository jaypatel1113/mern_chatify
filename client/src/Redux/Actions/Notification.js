import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_LINK,
})

export const fetchNotifications = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_NOTIFICATION_REQUEST",
        });

        const {data} = await client.get(`/api/notification/`);

        dispatch({
            type: "GET_NOTIFICATION_SUCCESS",
            payload: data.notification,
        });
        return data;
        
    } catch (error) {
        dispatch({
            type: "GET_NOTIFICATION_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const sendNotification = (chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "SEND_NOTIFICATION_REQUEST",
        });

        const {data} = await client.post(`/api/notification/add`, {chatId});

        dispatch({
            type: "SEND_NOTIFICATION_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "SEND_NOTIFICATION_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const deleteNotification = (chatId) => async (dispatch) => {
    try {
        dispatch({
            type: "DELETE_NOTIFICATION_REQUEST",
        });

        const {data} = await client.delete(`/api/notification/del/${chatId}`);

        dispatch({
            type: "DELETE_NOTIFICATION_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "DELETE_NOTIFICATION_FAILURE",
            payload: error.response.data.message,
        });
    }
}