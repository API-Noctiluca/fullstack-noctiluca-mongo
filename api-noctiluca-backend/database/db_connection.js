import mongoose from "mongoose";
import { MONGO_URI } from "../config/config.js";

async function db_connection() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

export default db_connection;