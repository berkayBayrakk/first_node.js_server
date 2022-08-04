const express =require('express');
const register=express.Router();
const registerController=require('../controllers/registerController');

register.route('/').post(registerController.handleNewPerson);


module.exports=register;