const express  = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/authController')
const {signupValidator, loginValidator  , updateProfileValidator , forgetPasswordByQuestion   } = require('../helper/validator');
// const mailer  = require('../helper/mailer');
const {isLogined , isAdmin} = require('../middlewires/auth')
router.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === 'image/jpeg' || 'image/png') {
            cb(null, path.join(__dirname,'../public/images/'))
        }
    },
    filename: function (req, file, cb) {
      const name = Date.now()+"-"+file.originalname;
      cb(null,name)
    }
  })
  const fileFilter = (req ,file ,cb)=>{
    if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null ,false)
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter:fileFilter
   });


  router.post('/register'  ,signupValidator ,  userController.signupUser )
//   router.post('/sendMailVerification' ,sendMailVerificationValidator , userController.sendMailVerfication);
//   router.post('/forgetpassword' , passwordResetValidator , userController.forgetpassword );
  router.post('/login' ,loginValidator ,userController.loginUser );

  //authenticatied routes
  router.get('/profile' ,isLogined , userController.userProfile);
  router.post('/updateprofile' , isLogined ,updateProfileValidator , upload.single('image') , userController.updateProfile );
  router.post('/refreshToken' ,isLogined, userController.refreshToken);
  router.get('/logout' ,isLogined, userController.logout);
  //forget password by security question
  router.post('/forget-password' ,forgetPasswordByQuestion ,userController.forgetPasswordByQuestion)
  router.get('/auth-admin' , isLogined , isAdmin ,  (req ,res )=>{
    return res.status(200).json({
      success:true,
      user: 'Logined user '
    })
  })
  router.get('/auth-user' , isLogined , (req ,res )=>{
    return res.status(200).json({
      success:true,
      user: 'Logined user '
    })
  })

  //otp verification routes
//   router.post('/sendotp'  , otpMailValidator , userController.sendOTP )
//   router.post('/verifyotp', verifyOtpValidator , userController.verfiyOTP )
module.exports = router;