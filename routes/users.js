const express=require('express');
const {userLogger}=require('../middleware/eventEmitter/eventEmitter');
const errorHandler=require('../middleware/error/errorHandler');
const usersController=require('../controllers/usersController');
const router=express.Router();
const ROLES_LIST=require('../config/roles_list');
const verifyRoles=require('../middleware/verifyRoles');

const idValidator=(id)=>{
    if(!isNaN(id)){
        return true
    }
    return false
}

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),usersController.getAllUsers)
    .delete(usersController.deleteUser)
    .put(usersController.updateUser)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),usersController.createUser);

router.route('/:id').get(usersController.getUserById).delete(usersController.deleteUserById)

//whenever router finds param this method invokes.
router.param('id',(req,res,next,id)=>{
    (idValidator(req.params.id))?
    userLogger(req,res,next,id):
    next();
})
router.route('*').get((req,res)=>{
    res.send('404 not found');
})



router.use(errorHandler);

module.exports=router;
