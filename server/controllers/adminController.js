const User = require("../models/User");
const Product = require("../models/Product");


const getAllUsers=async (req,res,next)=>{
    try{
        const users=await User.find({},"-password")   // Exclude passwords
        res.json(users);

    }catch(err){
        next(err)
    }

}

const deleteUser=async (req,res,next)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    }catch(err){
        next(err)
    }

}

const getAllProducts=async (req,res,next)=>{
    try{
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json(products);
    }catch(err){
        next(err)
    }

}

const createProduct=async (req,res,next)=>{
    try{
        const{name, description,type, waterLevel,sunlightLevel, easeOfCare,price,fertilization,category}=req.body;
        const imagePath=req.file?`/uploads/${req.file.filename}` :null; // Access image filename from req.file

  // Create a new product instance with the data
        const newProduct=new Product({
            name,
            description,
            type,
            waterLevel,
            sunlightLevel,
            easeOfCare,
            price,
            fertilization,
            image:imagePath,   // Store the image path in the database
            category

        })

        await newProduct.save();
        res.status(201).json(newProduct);

    }catch(err){
        next(err)
    }

}

const updateProduct=async (req,res,next)=>{
    try{
        const { name, description, type, waterLevel, sunlightLevel, easeOfCare, price, fertilization, category } = req.body;

        // Check if there's a new image
        const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Find the product and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                type,
                waterLevel,
                sunlightLevel,
                easeOfCare,
                price,
                fertilization,
                category,
                ...(imagePath && { image: imagePath }) // Update image only if a new one is provided
            },
            { new: true, runValidators: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);

    }catch(err){
        next(err)
    }

}

const deleteProduct=async (req,res,next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
    
        res.json({ message: "Product deleted successfully" });

    }catch(err){
        next(err)
    }

}

module.exports={getAllUsers,deleteUser,getAllProducts,createProduct,updateProduct,deleteProduct};