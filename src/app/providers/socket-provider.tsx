"use client";

// Import necessary modules and types
import { AppDispatch } from "@/app/store";
import { addTask, deleteTask, updateTask } from "@/app/store/tasks";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useTaskProvider } from "./tasks-provider";

// Define the context type for socket
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Create the SocketContext
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// SocketProvider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Get user and roomId from the task provider
  const { user } = useTaskProvider();
  const roomId = user.teamId;

  const dispatch = useDispatch<AppDispatch>();

  // Effect to manage socket connection
  useEffect(() => {
    if (!roomId) return;

    const newSocket = io(); // Initialize socket connection
    setSocket(newSocket);

    // Handle socket connection events
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  // Effect to handle socket event listeners
  useEffect(() => {
    if (!socket || !roomId) return; // Exit if socket or roomId is not available

    // Handle task update event
    const handleTaskUpdate = (data: any) => {
      if (data.task) {
        dispatch(updateTask({ id: data.task.id, body: data.task }));
      }
    };

    // Handle task added event
    const handleTaskAdded = (data: any) => {
      if (data.task) {
        dispatch(addTask(data.task));
      }
    };

    // Handle task delete event
    const handleTaskDelete = (data: any) => {
      if (data.taskId) {
        dispatch(deleteTask(data.taskId));
      }
    };

    // Register socket event listeners
    socket.on("receive_task_update", handleTaskUpdate);
    socket.on("receive_task_added", handleTaskAdded);
    socket.on("receive_task_deleted", handleTaskDelete);

    // Cleanup function to remove listeners
    return () => {
      socket.off("receive_task_update", handleTaskUpdate);
      socket.off("receive_task_added", handleTaskAdded);
      socket.off("receive_task_deleted", handleTaskDelete);
    };
  }, [socket, roomId, dispatch]);

  // Provide socket and connection status to children
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the SocketContext
export const useSocket = (): Socket | undefined | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};
