const express=require("express");
const router=express.Router();
// const multer=require("multer");
// const path=require("path");

const {getAllProducts,getProductById}=require("../controllers/productController")



router.get("/",getAllProducts);
router.get("/:id", getProductById);


module.exports=router;