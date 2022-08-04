const User=require('../model/User');

const getAllUsers=async(req,res,next)=>{
    const users=await User.find({});
    res.json(users);
}

const createUser=async(req,res,next)=>{
    const newUser={
        name:req.body.name,
        surname:req.body.surname
    }
    if(!newUser.name || !newUser.surname){
        return res.status(400).json({"message":"Name and surname are required."})
    }
    await User.create(newUser);
    const users=await User.find({});
    res.status(201).json(users);
}

const updateUser=async(req,res,next)=>{
    const newUser=await User.findOne({_id:req.body.id});
    if(!newUser){
        return res.status(400).json({"message":"User does not exist."})
    }
    newUser.name=(req.body.name)?req.body.name:newUser.name;
    newUser.surname=(req.body.surname)?req.body.surname:newUser.surname;
    await newUser.save();
    const users=await User.find({});
    res.status(201).json(users);
}

const deleteUser=async(req,res,next)=>{
    await User.findByIdAndDelete(req.body.id);
    const deleteUser=findUserById(req.body.id);
    if(!deleteUser){
        return res.status(400).json({"message":"User does not exist."})
    }
    User.findByIdAndDelete(req.body.id);
}

const getUserById=async(req,res,next)=>{
    const userChoosen=await findUserById(req.params.id);
    if(!userChoosen){
        return res.status(400).json({"message":"User does not exist."});
    }
    res.json(userChoosen);
}

const deleteUserById=async(req,res,next)=>{
    const userChoosen=await findUserById(req.params.id);
    if(!userChoosen){
        return res.status(400).json({"message":"User does not exist."});
    }
    await User.findByIdAndDelete(req.body.id);
    res.json(userChoosen);
}

const findUserById=async(id)=>{
    return(await User.findById(id));
}



module.exports={deleteUser,updateUser,getAllUsers,createUser,getUserById,deleteUserById};
