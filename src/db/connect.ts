import mongoose, { ConnectOptions } from "mongoose"
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
} as ConnectOptions)
    .then(() => {
        console.log("Connected to MongoDB!")
    });