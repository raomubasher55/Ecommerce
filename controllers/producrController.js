const slugify = require('slugify');
const productModel = require('../models/ProductModel');
const fs = require('fs');
const {validationResult}  = require('express-validator');

//create Prpduct
const createProduct = async(req ,res)=>{
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const {name , slug , description , price , category , quantity , shipping} = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Image is required',
            });
        }
        const product = new productModel({
            name,
            quantity,
            category,
            description,    
            price,
            shipping,
            slug:slugify(name),  
            image: 'images/' + req.file.filename,
        })
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Product ADd Successfully",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            success: false, 
            msg: error.message,
        })
    }
}

//get All Products
const getAllProducts = async(req ,res)=>{
    try {
        const products = await productModel.find({}).populate('category').select('-image').limit(12).sort({createdAt:-1})
        return res.status(200).json({
            success: true,
            message: "All Product",
            totalProducts: products.length,
            products,
        })
    } catch (error) {
        return res.status(400).json({
            success: false, 
            msg: error.message,
            message:"Error is Occur while getting all Products"
        })
    }
}

//Get Single Product
const getSingleProducts = async(req ,res)=>{
    try {
        const products = await productModel.findOne({slug:req.params.slug}).populate('category')
        return res.status(200).json({
            success: true,
            message: "Single Product",
            products,
        })
    } catch (error) {
        return res.status(400).json({
            success: false, 
            msg: error.message,
            message:"Error is Occur while getting Single Products"
        })
    }
}

//Get images of Products
const getImages = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('image')

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.image) {
            return res.status(200).json({
                success: true,
                message: "Image Found Successfully",
                Image: product.image
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
    } catch (error) {
        const statusCode = error instanceof TypeError ? 400 : 500;
        return res.status(statusCode).json({
            success: false,
            message: "Error occurred while getting images of the product",
            error: error.message,
        });
    }
};

//Delete the Product
const deleteProduct= async(req ,res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid);
        if(!product){
            return res.status(400).json({
                success: false,
                message: "Produt not found",
                error: error.message,
            });
        }

        return res.status(200).json({
            success:true,
            message:"Product Delete Scuccessfully", 
        })

        
    } catch (error) {
        const statusCode = error instanceof TypeError ? 400 : 500;
        return res.status(statusCode).json({
            success: false,
            message: "Error occurred while delteing of the product",
            error: error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        const updateFields = {};
        if(!name){
           return res.send("name is required")
        } 
        // Build the update object
        if (name) updateFields.name = name;
        if (name) updateFields.slug = slugify(name);
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (category) updateFields.category = category;
        if (quantity) updateFields.quantity = quantity;
        if (shipping !== undefined) updateFields.shipping = shipping;

        // Handle image upload if a new image is provided
        if (req.file) {
            updateFields.image = 'images/' + req.file.filename;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid,  { $set: updateFields }, {
            new: true, // Return the modified document rather than the original
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updatedProduct, // Corrected variable name here
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating the product",
            error: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProducts,
    getImages,
    deleteProduct,
    updateProduct,
}