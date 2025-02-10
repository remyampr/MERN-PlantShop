const express=require("express");
const Product=require("../models/Product");
const productsRoutes=require("../routes/productsRoutes");



const getAllProducts=async(req,res,next)=>{
    try {
        console.time('productsQuery'); // Performance tracking
        const products = await Product.find({}).maxTimeMS(10000); // 10-second query timeout
        console.timeEnd('productsQuery');
        
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
        
        res.json(products);
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