import mongoose from "mongoose";

const Schema=mongoose.Schema;
const contactSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        default:""
    },
},{timestamps:true});
const Contact=mongoose.model("Contact",contactSchema);
export default Contact;