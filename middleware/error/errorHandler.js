const {emit} =require('../eventEmitter/eventEmitter');

const errorHandler=(err,req,res,next)=>{
    emit(`${err.message}\t${err.name}`,'errorLogs.txt');
    console.log(err.stack);
    res.status(500).send(err.message)
}

module.exports=errorHandler;