import Contact from "../models/contact.js";
import ExpressError from "../utils/ExpressError.js";

export const postContact=async(req,res,next)=>{
    const {name,email,phone,message}=req.body;
    if(!name || !email || !phone){
        return next(new ExpressError(400,"Required Feilds missing"));
    }
    const newContact=new Contact({
        name,
        email,
        phone,
        message
    })
    await newContact.save();
    res.status(201).json(newContact);
}

export const getContacts=async(req,res,next)=>{
    const contacts=await Contact.find().sort({createdAt:-1});
    res.status(200).json(contacts);
}

export const deleteContact=async(req,res,next)=>{
    const deleted=await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
}