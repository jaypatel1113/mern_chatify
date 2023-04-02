import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdAccountCircle } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { Avatar } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ProfileModal = (props) => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <>
            {!props.children ? (
                <MdAccountCircle
                    onClick={handleOpen}
                    style={{ color: "#686de0", fontSize: "2rem" }}
                />
            ) : (
                <Typography onClick={handleOpen}>{props.children}</Typography>
            )}

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                        textAlign={"center"}
                        style={{
                            color: "#686de0",
                            fontWeight: 800,
                            fontFamily: "'Montserrat', sans-serif",
                        }}
                    >
                        {props.user.name}
                    </Typography>
                    <Box m={5} sx={{ textAlign: "center" }}>
                        <Avatar
                            alt={props.user.name}
                            src={props.user?.avtar?.url}
                            sx={{ width: 150, height: 150, margin: "auto" }}
                        />
                    </Box>

                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 3, textAlign: "center" }}
                        style={{
                            fontWeight: 600,
                            fontFamily: "'Poppins', sans-serif",
                        }}
                    >
                        Email: {props.user.email}
                    </Typography>

                    <Box
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "5%",
                            right: "5%",
                            cursor: "pointer",
                        }}
                    >
                        <AiFillCloseCircle style={{ color: "#f25b57", fontSize: "1.6rem" }}/>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ProfileModal;
