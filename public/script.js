const socket = io();

let senderName = "";

let receiverName = "";

let button = document.getElementById("join-btn");

button.addEventListener("click", (event) => {
  event.preventDefault(); //preventing the default behaviours

  console.log("clicked");

  let input = document.getElementById("username").value;

  if (input.trim() !== "" && input.split(" ").length === 2) {
    senderName = input.split(" ")[0];
    receiverName = input.split(" ")[1];
    document.querySelector(".form-username").style.display = "none";
    document.querySelector(".chatroom-container").style.display = "block";
  } else {
    alert("Enter valid input");
  }
});

document.getElementById("send-button").addEventListener("click", (event) => {
  event.preventDefault();

  const data = {
    sender_userName: username,
    message: document.getElementById("message-input").value,
    receiver_userName: receiverName,
  };

  //if 'io' is emitting anything 'sockets' can listen
  //if 'socket' is emitting anything only 'io' can listen

  //sending message to io
  socket.emit("message", data);

  //adding the sent message to ui
  addMessageToUI(data, "sent");
});

// receiving message from io
socket.on("message", (data) => {
  console.log(data);
  if (data.receiver_userName === senderName) {
    //if the sender username same as the current username it should not print the message
    addMessageToUI(data, "received");
  }
});

function addMessageToUI(data, type) {
  let receivedMessage = document.createElement("div");
  receivedMessage.setAttribute("class", `message ${type}`);
  receivedMessage.innerText = data.message;
  document.getElementById("message-container").appendChild(receivedMessage);
  if (type === "sent") {
    document.getElementById("message-input").value = "";
  }
}
