const express =require('express');
const auth=express.Router();
const authController=require('../controllers/authController');

auth.route('/').post(authController.handleLogin);

module.exports=auth;