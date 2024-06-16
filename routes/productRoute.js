const express = require("express");
const router = express.Router();
const { isLogined, isAdmin } = require("../middlewires/auth");
const productController = require("../controllers/producrController");
const formidableMiddleware = require("express-formidable");
const { createProductValidator } = require("../helper/productValidator");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || "image/png") {
      cb(null, path.join(__dirname, "../my-project/public/images/"));
    }
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post(
  "/create-product",
  isLogined,
  isAdmin,
  upload.single("image"),
  createProductValidator,
  productController.createProduct
);
router.get("/get-product", productController.getAllProducts);
router.get("/single-product/:slug", productController.getSingleProducts);
router.get("/product-images/:pid", productController.getImages);
router.delete(
  "/delete-product/:pid",
  isLogined,
  isAdmin,
  productController.deleteProduct
);
router.put(
  "/update-product/:pid",
  isLogined,
  isAdmin,
  upload.single("image"),
  productController.updateProduct
);
router.post("/product-filter", productController.filterProduct);
//product counter
router.get("/count-product", productController.productCount);
//product per page
router.get("/list-product/:page", productController.productList);
//search Products
router.get("/search/:keyword", productController.searchProducts);
//similar product
router.get('/related-product/:pid/:cid' , productController.relatedProduct);
//Category wise Products
router.get('/category-product/:slug' , productController.categroyProducts)

//payment routes

//token
router.get('/braintree/token' , productController.braintreeToken);
//payments
router.post('/braintree/payment' , isLogined , productController.braintreePayment)
module.exports = router;
