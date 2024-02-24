import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL,);
        console.log("Connected to mongoDB");
    }
    catch (error){
        console.log("Error while connecting MongoDB",error.message);
    }
};

export default connectToMongoDB;