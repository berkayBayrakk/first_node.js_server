require('dotenv').config();
const mongoose = require('mongoose');
const connectDB=require('./config/mongoose');
const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const corsOptionsDelegate=require('./config/corsOptions');
const chainArray=require('./config/chain');
const invalidUrlOptions=require('./config/invalidUrlOptions');
const {logger} =require('./middleware/eventEmitter/eventEmitter')
const errorHandler=require('./middleware/error/errorHandler');
const verifyJWT=require('./middleware/verifyJWT');
const cookieParser=require('cookie-parser');

const PORT=process.env.PORT;
connectDB();
//custom middleware
app.use(logger)

//defines who access API
app.use(cors(corsOptionsDelegate));

//built-in middleware
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use(cookieParser());

//routes
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
//jwt
app.use(verifyJWT);
app.use('/users',require('./routes/users'));
app.use('/logout',require('./routes/logout'));
app.use('/authority',require('./routes/authority'));
app.use('/password',require('./routes/password'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get('/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
})

//chain 
app.get('/chain(.html)?',chainArray)

//for invalid urls
app.all('*',invalidUrlOptions)

app.use(errorHandler);


mongoose.connection.once('open',()=>{
    console.log("Connection opened by MongoDB");
    
    app.listen(PORT,()=>{    
        console.log('Server running on port '+PORT)
    })
})