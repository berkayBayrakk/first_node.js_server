const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const personSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String,
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:Number
    }
});

module.exports=mongoose.model('Person',personSchema);