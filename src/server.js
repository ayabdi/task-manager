import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (room) => {
      console.log('joined', room)
      socket.join(room);
    });

    socket.on("update_task", (data) => {
      console.log("task", data)
      socket.to(data.room).emit("receive_task_update", data); 
    });

    socket.on("add_task", (data) => {
      console.log("task add", data);
      socket.to(data.room).emit("receive_task_added", data);
    });

    socket.on("delete_task", (data) => {
      console.log("task delete", data);
      socket.to(data.room).emit("receive_task_deleted", data);
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
