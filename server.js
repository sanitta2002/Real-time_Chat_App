const express = require("express")
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)



app.use(express.static(path.join(__dirname, 'public')))



io.on('connection',(socket)=>{
    console.log("new user connected")

    socket.on("newUser",(username)=>{
        socket.username = username
        socket.broadcast.emit("message",`${username} joined the chat`)
    })
    socket.on("chat",(message)=>{
      socket.broadcast.emit("chat",message)
    })
    socket.on("disconnect",()=>{
      if(socket.username){
        socket.broadcast.emit("message",`${socket.username} left the chat`)
      }
    })
})

const PORT = 3000
server.listen(PORT,()=>{
    console.log("server is running")
})