import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_LINK,
})

export const getUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LOAD_USER_REQUEST",
        });

        const {data} = await client.get("/api/user/me");

        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LOAD_USER_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: "REGISTER_REQUEST",
        });

        const {data} = await client.post("/api/user/register", userData);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "REGISTER_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_REQUEST",
        });

        const {data} = await client.post("/api/user/login", userData);

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data.user, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "LOGIN_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LOGOUT_REQUEST",
        });

        const {data} = await client.get("/api/user/logout");

        dispatch({
            type: "LOGOUT_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "LOGOUT_FAILURE",
            payload: error.response.data.message,
        });
    }
}

export const searchUsers = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: "SEARCH_REQUEST",
        });

        const {data} = await client.get(`/api/user/getusers?search=${userData}`);

        dispatch({
            type: "SEARCH_SUCCESS",
            payload: { users: data.users, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: "SEARCH_FAILURE",
            payload: error.response.data.message,
        });
    }
}
