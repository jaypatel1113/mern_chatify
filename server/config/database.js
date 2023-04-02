import mongoose from "mongoose";

export const connectDatabase = () => {
    // to avoid warnign in console
    mongoose.set("strictQuery", false);

    mongoose
        .connect(process.env.DATABASE)
        .then((c) => {
            console.log(`connected to ${c.connection.host}`.magenta.italic);
        })
        .catch((e) => {
            console.log(`error in connection : ${e}`.red.bold);
        });
};
