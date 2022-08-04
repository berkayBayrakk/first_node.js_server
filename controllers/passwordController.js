const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Person=require('../model/Person');

const changePasswordHandler=async(req,res)=>{
    let username=null;
    const {oldPassword,newPassword,verifyNewPassword}=req.body;
    const refreshToken=req.cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode)=>{
            //username=decode.username;
            username=decode.username;
        }
        );
    const findUser =await Person.findOne({username:username}).exec();
    try{
        const verifyOldPassword=await bcrypt.compare(oldPassword,findUser.password);
        if(!verifyOldPassword) return res.status(400).json({"message":"Old password is wrong"});

        if(newPassword!==verifyNewPassword)return  res.status(400).json({"message":"Passwords are not same"});

        const cryptedPassword=await bcrypt.hash(newPassword,10);
        await Person.updateOne({username:username},{password:cryptedPassword});
        return res.status(200).json({"success":"Password has changed"});

    }
    catch(err){
        res.status(500).json({"message":"Server error"});
    }
    
    
}
module.exports={changePasswordHandler};