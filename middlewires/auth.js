
const jwt = require('jsonwebtoken');
// const blackListModel = require('../models/blackList');


const isLogined = async(req , res ,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        return res.status(403).json({
            success: false,
            message: 'A Token is required for authorization'
        })
    }

    try {
        
            const decodedData = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
            req.user = decodedData;
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
    
    return next();
}

//check for the Admin
const isAdmin = async (req, res, next) => {
    if (req.user && req.user.user.role === 1) { // Access the role property correctly
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: 'Only admin can access'
        });
    }
}

module.exports = {isLogined , isAdmin};
