const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
app.use(cors())
const server = http.createServer(app)

const socketPort = process.env.SOCKETPORT || 8081

server.listen(socketPort, ()=>{
  console.log(`socket io running on port ${socketPort}`)
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods:['GET', 'POST']
  }
})

io.on('connection', (socket)=>{
  console.log(`User connected: ${socket.id}`)

  socket.on('join_room', (data)=>{
    socket.join(data.room)
    console.log(`User with ID: ${socket.id} joined room: ${data.room}`)
  })

  socket.on('send_message', (data)=>{
    socket.to(data.room).emit('receive_message', data)
  })

  socket.on('disconnect', ()=>{
    console.log('User disconnected', socket.id)
  })
})

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
