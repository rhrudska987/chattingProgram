"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")

sendButton.addEventListener("click", ()=>{
    const param = {
        name: nickname.value,
        message: chatInput.value
    }
    socket.emit("ChatRoom1", param)
})


socket.on("ChatRoom1", (data) => {
    const li = document.createElement("li");
    li.innerText = `${data.name}님이 - ${data.message}`;
    chatList.appendChild(li)
})

console.log(socket)