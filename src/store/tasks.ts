import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export type TaskStatus = "BACKLOG" | "TODO" | "IN PROGRESS" | "DONE";
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus
}

interface TasksState {
  selectedTask?: Task
  tasks: Task[];
}
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("/api/tasks");

  return response.data;
});

const initialState: TasksState = {
  selectedTask: undefined,
  tasks: [
    // Example initial tasks
    { id: "1", title: "Task 1", status: "TODO" },
    { id: "2", title: "Task 2", status: "IN PROGRESS" },
    { id: "3", title: "Task 3", status: "DONE" },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, "id">>) {
      const newTask: Task = {
        id: Date.now().toString(),

        ...action.payload,
      };
      state.tasks.push(newTask);
    },

    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.id);

      if (task) {
        task.status = action.payload.status;
      }
    },

    selectTask(state, action: PayloadAction<Task | undefined>) {
      state.selectedTask = action.payload;
    }

    // extraReducers: (builder) => {
    //   builder.addCase(
    //     fetchTasks.fulfilled,
    //     (state, action: PayloadAction<Task[]>) => {
    //       state.items = action.payload;

    //       state.status = "idle";
    //     }
    //   );

    //   // Handle other cases
    // },
  },
});

export const { addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
