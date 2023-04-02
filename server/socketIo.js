import { Server } from "socket.io";

export const socketIoInitialization = (server) => {

    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: ['http://localhost:3000', process.env.FRONTEND_URL],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        // console.log("connected to socketio");
        socket.on("setup", (userData) => {
            socket.join(userData._id);
            // console.log(userData._id);
            socket.emit("connected");
        });

        socket.on("join chat", (room) => {
            socket.join(room);
            console.log("User Joined Room: " + room);
        });

        socket.on("new message", (newMessageRecieved) => {
            // console.log(newMessageRecieved);
            var chat = newMessageRecieved?.chat;

            if (!chat?.users) return console.log("chat.users not defined");

            chat?.users?.forEach((user) => {
                if (user._id == newMessageRecieved.sender._id) return;

                socket.in(user._id).emit("message recieved", newMessageRecieved);
            });
        });

        socket.on("typing", (room) => socket.in(room).emit("typing"));
        socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

        
        socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    })
    
}