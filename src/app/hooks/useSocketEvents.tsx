import { useDispatch } from "react-redux";
import {
  addTaskAsync,
  updateTaskAsync,
  deleteTaskAsync,
} from "@/app/store/tasks"; // Import Redux actions for task management

import { AppDispatch } from "@/app/store";
import { useSocket } from "@/app/providers/socket-provider";
import { useTaskProvider } from "@/app/providers/tasks-provider";

const useSocketEvents = () => {
  const socket = useSocket(); // Initialize socket connection
  const { user } = useTaskProvider(); // Get user data from task provider
  const dispatch = useDispatch<AppDispatch>(); // Get dispatch function
  const roomId = user?.teamId; // Get the room ID from user data

  // Event Emitters + Api requests to update db + state manipulation
  // Emit an event to update a task.
  const emitTaskUpdate = async (task: any) => {
    if (!roomId) throw new Error("No roomid"); // Ensure room ID is available
    const result = await dispatch(updateTaskAsync({ id: task.id, body: task })).unwrap();

    if (result) {
      socket?.emit("update_task", { room: roomId, task: result }); // Emit update event
    }
  };

  // Emit an event to add a new task
  const emitAddTask = async (task: any) => {
    console.log({task, roomId})
    if (!roomId) throw new Error("No roomid"); // Ensure room ID is available
    const result = await dispatch(addTaskAsync(task)).unwrap();
    
    if (result) {
      socket?.emit("add_task", { room: roomId, task: result }); // Emit add event
    }
  };

  // Emit an event to delete a task
  const emitDeleteTask = async (taskId: string) => {
    if (!roomId) throw new Error("No roomid"); // Ensure room ID is available
    const result = await dispatch(deleteTaskAsync(taskId)).unwrap();
    
    if (result) {
      socket?.emit("delete_task", { room: roomId, taskId }); // Emit delete event
    }
  };

  // Return the emit functions for external use
  return { emitAddTask, emitTaskUpdate, emitDeleteTask };
};

export default useSocketEvents;
