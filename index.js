const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 5000

const publicDirectoryPath = path.join(__dirname, './public')
let message = 'Welocom to Server'
io.on('connection', (socket) => {
  console.log('New Websocket connection')
  socket.emit('message', message)
  socket.on('sendMessage', (inputMessage) => {
    io.emit('message', inputMessage)
  })
})

app.use(express.static(publicDirectoryPath))
server.listen(port, () => {
  console.log(`server started on ${port}`)
})
