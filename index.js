const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 5000

const publicDirectoryPath = path.join(__dirname, './public')
let message = 'Welcome to Server'
io.on('connection', (socket) => {
  console.log('New Websocket connection')

  socket.emit('message', message)

  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (inputMessage) => {
    io.emit('message', inputMessage)
  })
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
})

app.use(express.static(publicDirectoryPath))
server.listen(port, () => {
  console.log(`server started on ${port}`)
})
