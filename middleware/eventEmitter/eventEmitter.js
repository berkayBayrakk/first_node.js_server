const EventEmitter=require('events');
const logEvents =require('./logEvents');
class MyEmitter extends EventEmitter{};

const myEmitter=new MyEmitter();

myEmitter.on('log',(message,file)=>
    logEvents(message,file)
);

const emit=(msg,file)=>{
    myEmitter.emit('log',msg,file)
  
};

const logger=(req,res,next)=>{
    emit(`${req.method}\t${req.headers.origin}\t${req.url}`,'newLogEvents.txt')
    next();
}

const userLogger=(req,res,next,id)=>{
    emit(`${id} logged.`,'loginEvents.txt');
    next();
}

module.exports={emit,logger,userLogger};

