import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as contactRoutes } from "./routes/contactRoutes.js";
import cors from "cors";

const app=express();

dotenv.config();
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}
main().then(()=>{
    console.log("Connected");
}).catch((err)=>console.log(err));

const corsOptions={
    origin:"http://localhost:5173",
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(contactRoutes);


app.use((err,req,res,next)=>{
    const {status=500,message="Some Error Occured"}=err;
    console.log("Error:",err.message);
    res.status(status).send(message);
});

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})