"use strict"
const socket = io();

const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")

function getSearchParams() {
	let params = new URLSearchParams(window.location.search);
	return params;
}

function getNicknameFromParams(){
	const params = getSearchParams()
	return params.get("nickname");
}

//수정
function getProfileImageFromParams(){
    const params = getSearchParams()
    return params.get("profileImage");
}

chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13) {
        send()
        chatInput.value = ''
    }
})


function send() {
	const param = {
        name: getNicknameFromParams(),
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



function LiModel(name, message, time, profileImage) {
    this.name = name;
    this.message = message;
    this.time = time;
    this.profileImage = profileImage;

    this.makeLi = ()=> {
	    const li = document.createElement("li");
	    li.classList.add(getNicknameFromParams() === this.name ? "sent" : "received")
        this.profileImage = getProfileImageFromParams()
        const dom = `
            <div>
			<span class="profile">
        		<span class="user">${this.name}</span>
        		<img class="image"
                    src = ${this.profileImage}
		             alt="profileImage">
        	</span>
		        <span class="message">${this.message}</span>
		        <span class="time">${this.time}</span>
	        </div>`
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}

function addNicknameFromParams(){
	const nickname = document.querySelector("#nickname")
	nickname.innerHTML = getNicknameFromParams();
	console.log("하이");
}

addNicknameFromParams();

console.log(socket)
