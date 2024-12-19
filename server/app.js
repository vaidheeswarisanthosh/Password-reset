const express=require("express");
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const authRouter=require('./routes/authRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/auth',authRouter);

module.exports=app;