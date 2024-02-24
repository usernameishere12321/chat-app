import User from "../models/user.model.js";

export const getUserForSidebar = async (req,res) => {
    try {
        const users = await User.find({_id:{$ne:req.user._id}}).select("-password").exec();
        res.status(200).json(users);
    }
    catch(error){
        console.log("Error in getUserForSidebar controller",error.message);
        return res.status(500).json({"error":"Inernal server error"});
    }
};