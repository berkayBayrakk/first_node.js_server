const Person = require('../model/Person');

handleLogout=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204); //no content
    }
    const refreshToken=cookies.jwt;
    
    try{
        const findUser=await Person.findOne({refreshToken:refreshToken}).exec();
    if(!findUser){
        res.clearCookie('jwk',{httpOnly:true, maxAge:24*60*60*1000});
        return res.sendStatus(204);//no content
    }
    //delete token in DB
    
    await Person.updateOne({refreshToken:refreshToken},{refreshToken:''}).exec();
    }
    catch(err){
        res.status(500).json({"message":"Server error"});
    }

   res.clearCookie('jwk',{httpOnly:true, maxAge:24*60*60*1000}); //secure:true only https
   res.json({"message":"Logout clearly"});
}
module.exports={handleLogout};