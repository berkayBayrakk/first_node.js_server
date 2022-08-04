const path=require('path');
const urlControllerOptions=(req,res)=>{
    
    res.status(404);
    
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'..','views','404.html'))
    }
    else if(req.accepts('json')){
        res.json({error:'Error Not Found'})
    }
    else{
        
        res.type('txt').send('Not Found')
    }
    
}
module.exports=urlControllerOptions;