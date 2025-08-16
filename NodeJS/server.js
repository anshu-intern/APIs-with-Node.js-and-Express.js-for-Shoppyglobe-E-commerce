import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/index.js";

const app = express();
app.use(express.json());

//Establish connection to application database...
async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}

//Setup application server...
async function startServer() {
    await connectDB();
    routes(app);
    app.listen(3000, (err) => {
        if(err){
            console.log("Server failed to start:", err);
        } else{
            console.log("Server is running on port 3000...");
        }
    });
}

startServer();
