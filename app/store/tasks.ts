import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id: number;
  title: string;

  // other fields
}

interface TasksState {
  items: Task[];
  status: "idle" | "loading" | "failed";
}

const initialState: TasksState = {
  items: [],
  status: "idle",
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("/api/tasks");

  return response.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload;

        state.status = "idle";
      }
    );

    // Handle other cases
  },
});

export const { updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
