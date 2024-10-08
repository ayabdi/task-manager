import { Server as HTTPServer } from "http";
import { Socket } from "net";
import { NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { DefaultSession } from "next-auth";

export interface SocketServer extends HTTPServer {
  io?: IOServer;
}

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: Socket & {
    server: SocketServer;
  };
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        userId: string; // Add userId to the session type
    }
}