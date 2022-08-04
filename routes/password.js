const express =require('express');
const router=express.Router();
const passwordController=require('../controllers/passwordController');

router.route('/').post(passwordController.changePasswordHandler);

module.exports=router;