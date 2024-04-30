const express =  require('express');
const app =  express();
require('dotenv').config();
require('../config/db');
const cors = require('cors');
const port = process.env.port;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.frontendURL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: process.env.frontendURL,
  credentials: true
}));

const userRoutes = require('./routes/user');

const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname,'static')))
app.use('/',userRoutes);


app.listen(port,()=>{
})