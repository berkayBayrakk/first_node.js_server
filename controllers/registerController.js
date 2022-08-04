const bcrypt=require('bcrypt');
const Person = require('../model/Person');

//register
const handleNewPerson=async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({"message":"Username and password are required."});
    }
    try{
        const dublicateUsername=await Person.findOne({username:username}).exec();
        if(dublicateUsername){
            return res.status(409).json({"message":"Username is already exist."});
        }
        const cryptedPassword=await bcrypt.hash(password,10);
        const result=await Person.create({
            "username":username,
            "password":cryptedPassword
            });
        res.status(201).json({"success":`New user ${username} created.`});
    }
    catch(err){
        res.status(500).json({"message":"Server error."});
    }
}


module.exports={handleNewPerson};
