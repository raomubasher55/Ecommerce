const slugify = require("slugify");
const productModel = require("../models/ProductModel");
const fs = require("fs");
const { validationResult } = require("express-validator");
const categoryModel = require("../models/categoryModel");
var braintree = require("braintree");
const orderModel = require('../models/orderModel')

//patment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAIN_MERCHANT_ID,
  publicKey: process.env.BRAIN_PUBLIC_KEY,
  privateKey: process.env.BRAIN_PRIVATE_KEY,
});

//create Prpduct
const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { name, slug, description, price, category, quantity, shipping } =
      req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const product = new productModel({
      name,
      quantity,
      category,
      description,
      price,
      shipping,
      slug: slugify(name),
      image: "images/" + req.file.filename,
    });
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product ADd Successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Product",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting all Products",
    });
  }
};

//Get Single Product
const getSingleProducts = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    return res.status(200).json({
      success: true,
      message: "Single Product",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting Single Products",
    });
  }
};

//Get images of Products
const getImages = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");

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
        Image: product.image,
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
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Produt not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Delete Scuccessfully",
    });
  } catch (error) {
    const statusCode = error instanceof TypeError ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: "Error occurred while delteing of the product",
      error: error.message,
    });
  }
};

//update the product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const updateFields = {};
    if (!name) {
      return res.send("name is required");
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
      updateFields.image = "images/" + req.file.filename;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      { $set: updateFields },
      {
        new: true, // Return the modified document rather than the original
        runValidators: true,
      }
    );

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

//filter Products
const filterProduct = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body; // Provide default values if undefined
    console.log("Received data:", { checked, radio }); // Add this line for debugging
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the product",
      error: error.message,
    });
  }
};

//product count
const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    return res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting counnt Products",
    });
  }
};
//list product base on  page
const productList = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const productsList = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      productsList,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error is Occur while getting Product/list Products",
    });
  }
};
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error occurred while searching the products",
    });
  }
};

//related product
const relatedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    return res.status(200).json({
      success: true,
      product,
      message: "Similar Products Found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error occurred while searching the products",
    });
  }
};

//Category wise Products
const categroyProducts = async (req, res) => {
  try {
    const category = await categoryModel.find({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Category wise Product Find",
      products,
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error occurred while getting category wise the products",
    });
  }
};


//get product by order id
const orderById = async (req, res) =>{
  try {
    const order = await orderModel.findById(req.params.orderId);
    console.log(req.params.orderId);
    if(!order){
      return res.status(400).json({
        success: false,
        message : "order not find"
      })
    }
  
  
    const products =[];
      for(const productId of order.products){
        const product = await productModel.findById(productId);
        products.push(product);
      }
  
      return res.status(200).json({
        success : true,
        message : "Order and product is found",
        products
      })
  } catch (error) {
    console.error("Error in order Detail", error); // Log the error
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error while getting order deatail product",
    });
  }

  // const products = [];
    // for (const productId of order.products) {
    //   const product = await productModel.findById(productId);
    //   products.push(product);
    // }

    // return res.status(200).json({
    //   success: true,
    //   message: "Order and products found",
    //   order: {
    //     ...order._doc,
    //     products: products
    //   },
    // });


}

//payment gateway api
//token
const braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Error generating client token:", err); // Log the error
        return res.status(500).json({
          success: false,
          err,
        });
      } else {
        return res.status(200).json({
          success: true,
          response,
        });
      }
    });
  } catch (error) {
    console.error("Unexpected error in token generation:", error); // Log the error
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error occurred while getting token of payment",
    });
  }
};


//payment
const braintreePayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.forEach((i) => {
      total += i.price;
    });

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result && result.success) {
          try {
            const order = await new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            return res.status(200).json({
              success: true,
              order, // Return the order details
            });
          } catch (dbError) {
            console.error("Error saving order to database:", dbError); // Log the error
            return res.status(500).json({
              success: false,
              message: "Error saving order to database",
            });
          }
        } else {
          console.error("Transaction failed:", error || result.message); // Log the error or result message
          return res.status(500).json({
            success: false,
            error: error || result.message,
          });
        }
      }
    );
  } catch (error) {
    console.error("Unexpected error during payment processing:", error); // Log the error
    return res.status(400).json({
      success: false,
      msg: error.message,
      message: "Error occurred while processing payment",
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
  filterProduct,
  productCount,
  productList,
  searchProducts,
  relatedProduct,
  categroyProducts,
  braintreeToken,
  braintreePayment,
  orderById,
};
