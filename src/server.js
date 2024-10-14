import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

// Initialize the Next.js app with the specified settings
const app = next({ dev, hostname, port })
// Get the request handler from Next.js to handle all HTTP requests
const handler = app.getRequestHandler()

// Prepare the Next.js app
app.prepare().then(() => {
  // Create a native Node.js HTTP server using the Next.js request handler
  const httpServer = createServer(handler)
  // Initialize a new instance of Socket.io server, attaching it to the HTTP server
  const io = new Server(httpServer)

  // Listen for new client connections to the Socket.io server
  io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`) // Log the unique socket ID of the connected user

    // Listen for a 'join_room' event from the client
    socket.on('join_room', room => {
      console.log('joined', room) // Log the room that the client is joining
      socket.join(room) // Add the client to the specified room
    })

    // Listen for an 'update_task' event from the client
    socket.on('update_task', data => {
      console.log('task', data) // Log the task update data received from the client
      // Send the 'receive_task_update' event to all other clients in the same room
      socket.to(data.room).emit('receive_task_update', data)
    })

    // Listen for an 'add_task' event from the client
    socket.on('add_task', data => {
      console.log('task add', data) // Log the task addition data
      // Notify all other clients in the room about the new task
      socket.to(data.room).emit('receive_task_added', data)
    })

    // Listen for a 'delete_task' event from the client
    socket.on('delete_task', data => {
      console.log('task delete', data) // Log the task deletion data
      // Inform other clients in the room that a task has been deleted
      socket.to(data.room).emit('receive_task_deleted', data)
    })

    // Listen for the 'disconnect' event when a client disconnects
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`) // Log the disconnection
    })
  })

  // Start the HTTP server and listen on the specified port and hostname
  httpServer
    .once('error', err => {
      // Handle any errors during server startup
      console.error(err)
      process.exit(1) // Exit the process with an error code
    })
    .listen(port, '0.0.0.0', () => {
      // Log a message once the server starts listening
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
