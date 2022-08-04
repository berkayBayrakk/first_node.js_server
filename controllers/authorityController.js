const Person = require('../model/Person');

const addEditorAuthority=async(req,res)=>{
    const username=req.body.username;
    try{
        const findUser=await Person.findOne({username:username}).exec();
        if(!findUser) return res.sendStatus(400);

        const roles=Object.keys(findUser.roles);
        //detecct user is admin or editor
        if(roles.includes('Admin') || roles.includes('Editor')) return res.status(400).json({"message":"User is already admin or editor"});

        await Person.updateOne({username:username},{roles:{"Editor":1984,"User":2001}});
        res.status(201).json({"success":`User ${newUser.username} is editor.`});
    }
    catch(err){
        res.status(500).json({"message":"Server error"});
    }
}
module.exports={addEditorAuthority};