//import express
const express=require('express');

//make an express app
const app=express();

//giving protocol for server and integrate the app got from express
const server=require('http').Server(app);

//set the public folder to express
app.use(express.static('public'));

//integrate socket to server
const io=require("socket.io")(server);

//server will be having io
io.on('connection',(socket)=>{
    console.log("connection established:",socket.id);

    //socketA -> io -> socketB
    socket.on('message',(data)=>{ //user is sendig message
        io.emit('message',data);//emitting this message to all other sockets
    });

    //if any socket is disconnected this will print its id
    socket.on('disconnect',()=>{//showing off that user left the chat
        console.log(socket.id," Left chat");
    });
});

//setting port for the server
const port=8500;

//making the server listen to the port 8500
server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});