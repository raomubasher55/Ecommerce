const {check} = require('express-validator');

exports.createProductValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category  is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    check('shipping', 'Shipping must be a boolean').isBoolean(), 
    check('description', 'Description is required').not().isEmpty(),
    check('image').custom((value , {req})=>{
        if(req.file.mimetype === 'image/jpeg'  || req.file.mimetype === 'image/png'){
            return (null, true); 
        }else{
            return(null ,false)
        }
    }).withMessage("Please Upload an image jpeg or PNG")
];