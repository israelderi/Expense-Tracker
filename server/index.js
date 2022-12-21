import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import actionRoute from './routes/action.js'
import userRoute from './routes/user.js'

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB);
      console.log("Connected to DB !");
    } catch (error) {
      throw error;
    }
  };   


app.use("/api/actions", actionRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT, ()=> {
    connectDB()
    console.log(`server run in ${process.env.PORT}`)
});