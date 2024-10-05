// pages/api/socket.ts

import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io");

    const io = new Server(res.socket.server);

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_room", (room) => {
        socket.join(room);
      });

      socket.on("task_update", (data) => {
        socket.to(data.room).emit("receive_task_update", data);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  res.end();
}
