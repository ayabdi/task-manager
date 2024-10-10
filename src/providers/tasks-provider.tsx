"use client";

import { setTasks, Task } from "@/store/tasks";
import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

interface TaskProviderType {
  dict: any;
  tasks: Task[];
}

const TaskProvider = createContext<TaskProviderType | undefined>(undefined);

export const TaskProviderProvider: React.FC<{
  value: TaskProviderType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the tasks to the Redux store when the provider mounts
    dispatch(setTasks(value.tasks));
  }, [dispatch, value.tasks]);

  return (
    <TaskProvider.Provider value={value}>{children}</TaskProvider.Provider>
  );
};

export const useTaskProvider = () => {
  const context = useContext(TaskProvider);
  if (!context) {
    throw new Error("useTaskProvider must be used within a MyContextProvider");
  }
  return context;
};
