"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13) {
        send()
    }
})

function send() {
    const param = {
        name: nickname.value,
        message: chatInput.value
    }
    socket.emit("ChatRoom1", param)
}

sendButton.addEventListener("click", send)


socket.on("ChatRoom1", (data) => {
    const {name, message, time} = data;
    const item = new LiModel(name, message, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, message, time) {
    this.name = name;
    this.message = message;
    this.time = time;

    this.makeLi = ()=> {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        // https://play.google.com/store/apps/details?id=com.kaovx.tf1.golfaround&hl=en_US
        // <img class="image" src="https://placeimg.com/50/50/any" alt="any">
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://play-lh.googleusercontent.com/vqOAck2RIZoJsOO6eOBwnXgPkwVW0IL7n3mqO-dqYvp2xJ5HH3AcuIp3ChI7FWQ7YX8=w480-h960-rw" alt="profile Image">
        </span>
        <span class="message">${this.message}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}

console.log(socket)