let userName="";

let button = document.getElementById("join-btn");

button.addEventListener('click',(event)=>{
    // console.log("test")
    event.preventDefault();//preventing the default behaviours
    userName=document.getElementById("username").value;
    if(userName.trim()!==""){
        document.querySelector(".form-username").style.display="none";
        document.querySelector(".chatroom-container").style.display="block";
    }
})
