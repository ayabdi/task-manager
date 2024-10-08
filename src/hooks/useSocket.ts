import { AppDispatch, RootState } from "@/store";
import { setSocket } from "@/store/socket";
import { addTask, updateTask } from "@/store/tasks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socket = useSelector((state: RootState) => state.socket.socket);
  const roomId = useSelector((state: RootState) => state.user.userRecord?.teamId);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect((): any => {
    if (!!socket?.connected || !!socket) return

    const socketIo = io();
    dispatch(setSocket(socketIo))

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, [socket]);
 
  

  useEffect(() => {
    if (!socket || !roomId) return;


    const handleTaskUpdate = (data: any) => {
      console.log(data);
      if (data.task) {
        dispatch(updateTask({ id: data.task.id, body: data.task }));
      }
    };

    const handleTaskAdded = (data: any) => {
      console.log({ data });
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

  return socket;
};
