import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import MyUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
  console.log("Connected to MongoDB Database");
})

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Food Order App API",})
});

app.use("/api/my/user", MyUserRoute);

app.listen(7000, () => {
    console.log("Server is running on port 7000");
})
