const express=require("express");
const Product=require("../models/Product");
const productsRoutes=require("../routes/productsRoutes");

const getAllProducts=async(req,res,next)=>{
    try{
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json(products);
       
    }catch(err){
        next(err);
    }
}
const getProductById=async(req,res,next)=>{
    try{

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }catch(err){
        next(err);
    }
}

module.exports={getAllProducts,getProductById};