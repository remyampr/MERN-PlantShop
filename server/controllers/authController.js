const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
require("dotenv").config();

const JWT_SECRET=process.env.JWT_SECRET;

 const registerUser=async (req,res,next)=>{
    try{
        const {name,email,password,isAdmin}=req.body;
        if(isAdmin){
            const admin = await User.findOne({ isAdmin: true });
            if (admin) {
                return res.status(400).json({ message: "Admin already exists" });
              }
        }

         // If isAdmin is not specified, default to regular user
         const role=isAdmin || false;

  // Check if user already exists
        let user=await User.findOne({email});
        if(user) return res.status(400).json({msg:"User already exist"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        user=new User({
            name,
            email,
            password:hashedPassword,
            isAdmin: role, // set isAdmin based on input
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });


    }catch(err){
        next(err);
    }
}
const loginUser=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user) return res.status(400).json({msg : "invalid credentials"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)  return res.status(400).json({msg : "PAssword not match"});

          // Generate a JWT token including the isAdmin field
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},JWT_SECRET,{expiresIn:"1h"});
        res.json({msg:"Login successful",token,User:{id:user._id,Name:user.name,Email:user.email,isAdmin:user.isAdmin}})


    }catch(err){
        next(err);
    }
}

module.exports={registerUser,loginUser}