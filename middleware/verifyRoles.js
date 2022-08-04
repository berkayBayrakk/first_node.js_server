const verifyRoles=(...allRoles)=>{
    return (req,res,next)=>{
        console.log(req.roles);
        if(!req?.roles) return  res.sendStatus(401);
        const rolesArray=[...allRoles];
        //control that roles which came from request are included in parameter
        const result= req.roles.map((role)=> rolesArray.includes(role) ).find(value=>value===true);
        if(!result) return res.sendStatus(401);
        next();
    }
}
module.exports=verifyRoles;