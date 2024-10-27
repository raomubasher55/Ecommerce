const mongoose  =require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type: Number,
        required:true
    },  
    image:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Number,
        default:0,
    },
    answer:{
        type: String,
        required: true,
    },
    role: {
        type: Number, 
        required: true,
        default: 0
    },
    address:{
        type:String,
    }
});

module.exports  = mongoose.model("User" , userSchema);