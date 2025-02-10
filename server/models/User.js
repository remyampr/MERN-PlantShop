
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},{timestamps:true});
module.exports=mongoose.model("User",userSchema);


// Mongoose will automatically manage two fields for you:
// createdAt: The date and time when the document is created (automatically set when a document is inserted).
// updatedAt: The date and time when the document was last modified
// It’s useful for cache management or data synchronization if you're ever syncing data with another system.