import cloudinary from "cloudinary";

import { User } from "../model/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const { fName, lName, email, password, avtar } = req.body;

        let myCloud;

        if(!fName || !lName || !email || !password) {
            return res.status(403).json({ success: false, message: "Fill all details 🫤" });
        }
        
        // capitalize first word name
        var firstName = fName[0].toUpperCase() + fName.substring(1);
        var lastName = lName[0].toUpperCase() + lName.substring(1);
        const name = firstName +  " " + lastName;
        
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(409).json({ success: false, message: "User already Registered 😒" });
        }

        let newUser = {
            name,
            email,
            password,
        }

        if(avtar) {
            myCloud = await cloudinary.v2.uploader.upload(avtar, {
                folder: "mern-chat",
            });

            newUser = {
                ...newUser,
                avtar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            };
        }

        const user = await User.create(newUser);
        
        // token generate
        const token = await user.generateAuthtoken();

        if(user) {
            // tokenexpires after 3days
            res.status(201)
                .cookie("token", token, {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "development" ? false : true,
                    sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
                })
                .json({
                    success: true,
                    message: "Registered Successfully",
                    user,
                });
        } else {
            res.status(500).json({success: false, message: "Failed to create user ❌"});
        }

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(403).json({ success: false, message: "Fill all details 😒" });
        }

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials ❌" });
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials ❌" });
        }

        // token generate
        const token = await user.generateAuthtoken();

        // delete password field from user object before sending to frontend
        user = await User.findOne({ email })
        
        // cretae cookie which expires in 3d
        res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === "development" ? false : true,
                sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
                // secure: true,
                // sameSite: "none",
            })
            .json({ success: true, message: "Logged In Successfully ✅", user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((curelem) => {
            curelem.token !== req.token;
        });

        await User.findByIdAndUpdate(
            req.user._id,
            { tokens: req.user.tokens },
            { new: true }
        );
        // // set cookie null and change expires to current time
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
                secure: process.env.NODE_ENV === "development" ? false : true,
                sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
            })
            .json({ success: true, message: "Logged Out Successfully ✅" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const myProfile = async (req, res) => {
    try {
        // finds first user with specified id
        const user = await User.findById(req.user._id);

        res.status(200).json({ success: true, user });
    } catch (error) {
        // res.status(400).json({ success: false, message: error.message });
        res.status(400).json({ success: false });
    }
};

export const getAllUsers = async (req, res) =>  {
    try {
        const keyword = req.query.search || null;

        // finds all users with keyword excluding current logged in user 
        const findUsers = await User.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
            ],
        })
            .select("name email avtar")
            .find({ _id: { $ne: req.user._id } });
        if(findUsers.length>0) {
            res.status(206).json({success: true, users: findUsers});
        } else {
            res.status(400).json({ success: false, message: "No user Found ❌" });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: "Enter name or email to search 😒" });
    }
}