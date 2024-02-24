import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async (URI) => {
    try {
        const DB_OPTIONS = {
            DBNAME : process.env.DBNAME
        }
       // console.log(DB_OPTIONS)
        await mongoose.connect(URI,DB_OPTIONS)
        console.log('connect successfully....')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;