const jwt=require('jsonwebtoken');
const Person=require('../model/Person');

const handleRefreshToken=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refreshToken=cookies.jwt;
    const findUser=await Person.findOne({refreshToken:refreshToken}).exec();
    if(!findUser){
        return res.sendStatus(403); //forbidden
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode)=>{
            if(err || decode.username !== findUser.username){
                return res.sendStatus(403); //forbidden
            }
            const roles =Object.values(findUser.roles);
            const accessToken=jwt.sign(
                {
                    "UserInfo":{
                        "username":decode.username,
                        "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )
            res.json({accessToken});
        }
    );
   
}
module.exports={handleRefreshToken};