//import express
const express=require('express');

//make an express app
const app=express();

//giving protocol for server and integrate the app got from express
const server=require('http').Server(app);

//set the public folder to express
app.use(express.static('public'));

//setting port for the server
const port=8500;

//making the server listen to the port 8500
server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});