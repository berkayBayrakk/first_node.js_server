const path=require('path');
const fs=require('fs');
const fsPromises=require('fs').promises;
const {v4:uuid} =require('uuid');
const {format} =require('date-fns');

const logEvents=async(message,file)=>{
    const date=format(new Date(), 'yyyy-MM-dd hh-mm');
    const logItem=`${date}\t${uuid()}\t${message}\n`;
    try {
        if(!fs.existsSync(path.join(__dirname,'..','..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','..','logs',file),logItem)
    } catch (error) {
        console.error(error);
    }
}

module.exports=logEvents;