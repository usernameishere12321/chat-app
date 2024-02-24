import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if (/\s/.test(username)) {
            return res.status(400).json({"error":"Whitespace is not allowed in username"});
        };

        if(password !== confirmPassword){
            return res.status(400).json({"error":"Passoword doesn't match"});
        };

        const user = await User.findOne({username});
        if (user){
            return res.status(400).json({"error":"Username already exist"});
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        });
        
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            });
        }else{
            return res.status(500).json({"error":"Invalid user data"});
        }
        
    }
    catch(error){
        console.log("Error in signup controller",error.message);
        return res.status(500).json({"error":"Inernal server error"});
    }
};

export const login = async (req,res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if (!user || !isPasswordCorrect){
            return res.status(400).json({"error":"Invalid username or password"});
        }
        
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });
    }
    catch(error){
        console.log("Error in login controller",error.message);
        return res.status(500).json({"error":"Inernal server error"});
    }
};

export const logout = async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({"message":"Logout successfully"});   
    }
    catch(error){
        console.log("Error in signup controller",error.message);
        return res.status(500).json({"error":"Inernal server error"});
    }
};