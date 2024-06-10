const mongoose = require('mongoose');

const producrSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true   
    },
    category:{
        type:mongoose.ObjectId,
        ref: 'Category'
    },
    image:{
        type:String,
        required:true
    },
    shipping:{
        type:Boolean,
        required:true,
        default:false
    },
    quantity:{
        type:Number,
        required:true
    }
} ,{timestamps:true}
)

module.exports = mongoose.model('Product' , producrSchema);