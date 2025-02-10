const express= require("express");
require("dotenv").config();
const mongoose=require('mongoose');
const cors=require("cors");

const errorHandler=require("./middlewares/errorHandler");
const productsRoutes=require("./routes/productsRoutes");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes")

const app=express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDb Connected : "))
.catch((err)=>console.log(err))

app.use(errorHandler);
// Middleware to serve static files (images) from the 'MyUploads' folder
app.use("/uploads",express.static("MyUploads"));

app.use("/api/products/",productsRoutes);
app.use("/api/auth/",authRoutes);
app.use("/api/user/",userRoutes);
app.use("/api/admin",adminRoutes)

app.get("/",(req,res)=>{
    res.send("API is Runnig....")
})

const PORT=process.env.PORT || 5200;

app.listen(PORT,()=>console.log(`server running at http://localhost:${PORT}`))