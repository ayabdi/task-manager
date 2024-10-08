import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, addTask, addTaskAsync } from "@/store/tasks"; // Import your Redux actions

import { AppDispatch, RootState } from "@/store";
import { User } from "@prisma/client";
import { useSocket } from "@/providers/socket-provider";

const useSocketEvents = (user?: User) => {
  const socket = useSocket()

  const dispatch = useDispatch<AppDispatch>();
  const roomId = useSelector(
    (state: RootState) => state.user.userRecord?.teamId
  );
  
  // Function to emit events
  const emitTaskUpdate = (task: any) => {
    if (!roomId) throw new Error("No roomid");
    socket?.emit("update_task", { room: roomId, task });
  };

  const emitAddTask = async (task: any) => {
    if (!roomId) throw new Error("No roomid");
    const result = await dispatch(addTaskAsync(task)).unwrap();
    if (result) {
      socket?.emit("add_task", { room: roomId, task });
    }
  };

  // Return the emit functions along with any other necessary data
  return { emitAddTask, emitTaskUpdate };
};

export default useSocketEvents;
