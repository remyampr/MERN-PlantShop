const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String },
    waterLevel: { type: String },
    sunlightLevel: { type: String },
    easeOfCare: { type: String },
    price: { type: Number, required: true },
    fertilization: { type: String },
    image: { type: String },  // Store the path to the image file
    category: { type: String }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports=mongoose.model("Product",productSchema);
