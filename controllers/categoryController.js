const categoryModel = require('../models/categoryModel');
var slugify = require('slugify')
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).json({
                success: false,
                message: "Name is required"
            })
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(401).json({
                success: false,
                message: "Category Already Exists"
            });
        }

        const category = await new categoryModel({ name, slug: (slugify(name)) }).save();
        return res.status(200).json({
            success: true,
            message: `${name} is Add Successfully`,
            category
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

//update Category
const updateCategroy = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params
        if (!name) {
            return res.status(401).json({
                success: false,
                message: "Name is required"
            })
        }



        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: `${name} is Update Successfully`,
            category
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
            message: "A Error is Occur while Updating Category"
        })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        return res.status(200).json({
            success: true,
            message: "Get All Categories",
            category,
            total:category.length
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

const singleCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({ slug: req.params.slug });
        return res.status(200).json({
            success: true,
            message: "Get Sigle  Categories Successfully",
            category,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: " Category Delelte Successfully",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}
module.exports = {
    createCategory,
    updateCategroy,
    getAllCategory,
    singleCategory,
    deleteCategory,
}