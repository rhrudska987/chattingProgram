const express = require("express")
const http = require("http")
const app = express();                                              //express를 실행한 내용을 app에 담음
const path = require("path")
const server = http.createServer(app) //서버 생성
const socketIO = require("socket.io")

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")))               //__dirname은 프로젝트 폴더, path.join은 운영체제마다 /와\가 다르기에 사용
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    console.log("connect")
    socket.on("ChatRoom1", (data)=>{
        io.emit("ChatRoom1", data)
    })
})

server.listen(PORT, () => console.log(`server is running ${PORT}`))