const { createServer } = require('http')
const { Server } = require('socket.io')
const { app, sessionParser } = require('./app')
const { Task } = require('./db/models')

const httpServer = createServer(app)

const PORT = process.env.PORT || 3000
const io = new Server(httpServer)

io.on('connection', (socket) => {
  const { request } = socket
  const url = socket.handshake.headers.referer
  const id = Number(url.replace('http://localhost:3000/memberTask/', ''))

  socket.on('task:outgoing', async (payload) => {
    const { text } = payload 
    const task = await Task.create({
      text, listId: id, status: false,
    })
    io.emit('task:incoming', task)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`)
})
