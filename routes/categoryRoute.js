const express  = require('express');
const router = express();
const categoryController = require('../controllers/categoryController')
const {isLogined , isAdmin} = require('../middlewires/auth');
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
  


router.post('/create-category'  ,isLogined , isAdmin ,upload.single("image") ,categoryController.createCategory );
router.put('/update-category/:id'  ,isLogined , isAdmin , categoryController.updateCategroy );
router.get('/get-category' , categoryController.getAllCategory );
router.get('/single-category/:slug' , categoryController.singleCategory );
router.delete('/delete-category/:id' ,isLogined , isAdmin , categoryController.deleteCategory );
module.exports = router;