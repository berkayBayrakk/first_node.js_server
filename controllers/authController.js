const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Person = require('../model/Person');

//find user from database
const handleLogin=async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({"message":"Username and password are required."});
    }
    try{     
        const findUser=await Person.findOne({username:username}).exec();
        if(!findUser){
            return res.sendStatus(401);
        }
        const roles=Object.values(findUser.roles);
        const match=await bcrypt.compare(password,findUser.password)
        if(match){
            const accessToken=jwt.sign(
                {
                    "UserInfo":{
                        "username":findUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            );
            const refreshToken=jwt.sign(
                {"username":findUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            );
            await Person.updateOne({username:findUser.username},{refreshToken:refreshToken}).exec();
            res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:1000*24*60*60})
            res.json({accessToken});
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({"message":"Server error."});
    }
}
module.exports={handleLogin};