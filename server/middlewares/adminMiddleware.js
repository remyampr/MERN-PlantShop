
const jwt=require("jsonwebtoken");

const adminMiddleware=(req,res,next)=>{
 try{
       // check the tpken in header
       const token=req.header("Authorization");
       if(!token){
           return res.status(401).json({ message: "Access Denied. No token provided." });
       }
   
       // verify the token
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
   
        // Check if the user is an admin
        if(!decoded.isAdmin){
           return res.status(403).json({ message: "Access Denied. Admins only." });
        }
   
        req.user = decoded; // Store user data in request object
        next();
 }catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }

}

module.exports=adminMiddleware;