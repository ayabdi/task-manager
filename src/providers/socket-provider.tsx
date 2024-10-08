import { AppDispatch, RootState } from "@/store";
import { addTask, updateTask } from "@/store/tasks";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const roomId = useSelector(
    (state: RootState) => state.user.userRecord?.teamId
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io(); // Replace with your socket server URL
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  // Effect to handle socket event listeners
  useEffect(() => {
    // Exit if socket or roomId is not available
    if (!socket || !roomId) return;

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

    // Register socket event listeners
    socket.on("receive_task_update", handleTaskUpdate);
    socket.on("receive_task_added", handleTaskAdded);

    // Cleanup function to remove listeners
    return () => {
      socket.off("receive_task_update", handleTaskUpdate);
      socket.off("receive_task_added", handleTaskAdded);
    };
  }, [socket, roomId, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | undefined | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};
