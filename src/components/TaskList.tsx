import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import { updateTask } from "../store/tasks";
import { AnimateSharedLayout, motion } from "framer-motion";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const socket = useSocket();

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.items);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", "task_room");

    socket.on("receive_task_update", (data) => {
      dispatch(updateTask(data.task));
    });

    return () => {
      socket.off("receive_task_update");
    };
  }, [socket, dispatch]);

  const handleTaskUpdate = (task) => {
    // Update task logic
    socket.emit("task_update", { room: "task_room", task });
  };

  return (
    <AnimateSharedLayout>
      <motion.div layout>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default TaskList;
