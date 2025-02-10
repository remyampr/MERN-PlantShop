const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");

const {upload}=require("../uploadConfig");

const adminMiddleware=require('../middlewares/adminMiddleware');
const {getAllUsers,deleteUser,getAllProducts,createProduct,updateProduct,deleteProduct}=require("../controllers/adminController");

// user mangement
router.get("/users",adminMiddleware,getAllUsers);
router.delete("/user/:id",adminMiddleware,deleteUser);

// Product mangement
router.get("/products",adminMiddleware,getAllProducts);
router.post("/products",adminMiddleware,upload.single('image'),createProduct)
router.put("/products/:id",adminMiddleware,upload.single('image'),updateProduct)
router.delete("/products/:id",adminMiddleware,deleteProduct)

module.exports=router;