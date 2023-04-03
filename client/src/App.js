import React, { useEffect } from "react";
import { Navigate, Route, Routes, } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Error404 from "./Components/Error404";
import Unauthorized from "./Components/Unauthorized";
import Loading from "./Components/Loading";
import AuthRoutes from "./ProtectedRoutes/AuthRoutes";

import { getUser } from "./Redux/Actions/User";
import { fetchAllChats } from "./Redux/Actions/Chat";
import { fetchNotifications } from "./Redux/Actions/Notification";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {
    const { message, error, isAuthenticated, initalLoading, isLogin } = useSelector((state) => state.user);
    const { message: chatMsg, error: chatErr } = useSelector((state) => state.chat);
    const { error: messErr } = useSelector((state) => state.message);
    const { error: notiErr, message: notiMess } = useSelector((state) => state.notifications);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            await dispatch(getUser());
            await dispatch(fetchAllChats());
            await dispatch(fetchNotifications());
        }
        loadData();
    }, [isLogin, dispatch]);

    // display messages and errors from backend in all components
    useEffect(() => {
        if (error) {
            toast.error(error, {toastId: error});
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (chatErr) {
            toast.error(chatErr, {toastId: chatErr});
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (messErr) {
            toast.error(messErr, {toastId: messErr});
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (notiErr) {
            // toast.success(notiErr, {toastId: notiErr});
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (message) {
            toast.success(message, {toastId: message});
            dispatch({ type: "CLEAR_MESSAGE" });
        }
        if (chatMsg) {
            toast.success(chatMsg, {toastId: chatMsg});
            dispatch({ type: "CLEAR_MESSAGE" });
        }
        if (notiMess) {
            // toast.success(notiMess, {toastId: notiMess});
            dispatch({ type: "CLEAR_MESSAGE" });
        }
    }, [error, message, notiErr, messErr, chatErr, chatMsg, notiMess, dispatch]);

    return (
        <>
            {
                initalLoading ? <Loading /> : (

                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Navigate to="/chat" /> : <Home />} />
                        
                        <Route element={<AuthRoutes isAuthenticated={isAuthenticated} />}>
                            <Route path="/chat" element={<Chat />} />
                        </Route>

                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                )
            }
            
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                limit={5}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default App;
