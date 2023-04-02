import cloudinary from "cloudinary";
import colors from "colors";

import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { socketIoInitialization } from "./socketIo.js";

const PORT = process.env.PORT || 5000;

connectDatabase();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`listening on Port : http://localhost:${PORT}`.cyan.bold);
});

socketIoInitialization(server);

app.get("/", (req, res) =>
    res.json({
        success: true,
        message: `welcome to the backend zone (${PORT}) ✌🏻`,
    })
);

