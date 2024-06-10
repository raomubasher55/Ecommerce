const express  = require('express');
const router = express();
const categoryController = require('../controllers/categoryController')
const {isLogined , isAdmin} = require('../middlewires/auth');

router.post('/create-category'  ,isLogined , isAdmin , categoryController.createCategory );
router.put('/update-category/:id'  ,isLogined , isAdmin , categoryController.updateCategroy );
router.get('/get-category' , categoryController.getAllCategory );
router.get('/single-category/:slug' , categoryController.singleCategory );
router.delete('/delete-category/:id' ,isLogined , isAdmin , categoryController.deleteCategory );
module.exports = router;