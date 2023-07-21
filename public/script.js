
const socket=io();

let username='';

let button = document.getElementById("join-btn");

button.addEventListener('click',(event)=>{
    // console.log("test")
    event.preventDefault();//preventing the default behaviours
    username=document.getElementById("username").value;
    if(username.trim()!==""){
        document.querySelector(".form-username").style.display="none";
        document.querySelector(".chatroom-container").style.display="block";
    }
});

document.getElementById("send-button").addEventListener('click',(event)=>{
    event.preventDefault();

    const data = {
        userName : username,
        message : document.getElementById("message-input").value
    }

    //if 'io' is emitting anything 'sockets' can listen
    //if 'socket' is emitting anything only 'io' can listen

    //sending message to io
    socket.emit('message',data);

    //adding the sent message to ui
    addMessageToUI(data,"sent");
});

//receiving message from io
socket.on('message',(data)=>{
    if(data.userName!==username){//if the sender username same as the current username it should not print the message
        addMessageToUI(data,"received");
    }
});

function addMessageToUI(data,type){
    let receivedMessage = document.createElement("div");
    receivedMessage.setAttribute("class",`message ${type}`);
    receivedMessage.innerText=data.message;
    document.getElementById("message-container").appendChild(receivedMessage);
    if(type==="sent"){
        document.getElementById("message-input").value="";
    }
}