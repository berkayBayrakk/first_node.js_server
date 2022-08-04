const express =require('express');
const authority=express.Router();
const authorityController=require('../controllers/authorityController');
const verifyRoles=require('../middleware/verifyRoles');
const ROLES_LIST=require('../config/roles_list');

authority
    .route('/')
    .post(verifyRoles(ROLES_LIST.Admin),authorityController.addEditorAuthority);

module.exports=authority;