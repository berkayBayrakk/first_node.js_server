const one=(req,res,next)=>{
    console.log('Chain starting..');
    next();
}
const two=(req,res,next)=>{
    console.log('....');
    next();
}
const three=(req,res)=>{
    
    console.log('Finished.');
    res.sendFile(path.join(__dirname,'views','index.html'));
}
const arr=[one,two,three];

module.exports=arr;