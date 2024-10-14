import {
  useSensors,
  useSensor,
  PointerSensor,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { AppDispatch, RootState } from "@/app/store";
import { Task, TaskStatus, updateTask } from "@/app/store/tasks";
import { useDispatch, useSelector } from "react-redux";
import { ColumnType } from "@/app/components/tasks/TaskBoard";
import useSocketEvents from "./useSocketEvents";

export const useTasks = () => {
  // Fetch tasks and get update mutation
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch = useDispatch<AppDispatch>();
  const { emitTaskUpdate } = useSocketEvents(); // Call the socket event handler
  
  // State for tracking active column and task during drag
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Define column types and their colors
  const columnDefinitions = [
    { name: "BACKLOG", color: "gray" },
    { name: "TODO", color: "blue" },
    { name: "IN PROGRESS", color: "orange" },
    { name: "COMPLETE", color: "green" },
  ];

  // Create columns with their associated tasks
  const columns = columnDefinitions.map((column) => ({
    ...column,
    tasks: tasks?.filter((task) => task.status === column.name) || [],
  }));

  // Memoize column IDs
  const columnsId = useMemo(
    () => (columns?.map((col) => col.name || "") as any) || [],
    [columns]
  );

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Function to update task status
  const onUpdateTask = (id: string, task: Task) => {
    dispatch(updateTask({ id, body: task }));

    emitTaskUpdate(task);
  };

  // Handle drag start event
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  // Handle drag end event
  function onDragEnd(event: DragEndEvent) {
    if (!tasks) return;

    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over || active.id === over.id || active.data.current?.type !== "Task")
      return;

    const activeId = active.id;
    const overId = over.id;
    const activeIndex = tasks?.findIndex((t) => t.id === activeId);

    // Determine new status based on drop target
    const newStatus =
      over.data.current?.type === "Column"
        ? (overId as TaskStatus)
        : (tasks.find((t) => t.id === overId)?.status as TaskStatus);

    // Update task status
    if (newStatus) {
      const updatedTask = { ...tasks[activeIndex], status: newStatus }; // Create a new task object
      onUpdateTask(updatedTask.id, updatedTask); // Dispatch the update action
    }
  }

  return {
    activeColumn,
    activeTask,
    setActiveColumn,
    setActiveTask,
    columnsId,
    sensors,
    columns,
    onDragEnd,
    onDragStart,
    tasks,
  };
};
