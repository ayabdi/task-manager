import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type TaskStatus = "BACKLOG" | "TODO" | "IN PROGRESS" | "DONE";
export interface Task {
  id: string;
  title: string;
  description?: string | null
  status: TaskStatus | string
}

interface EditorState {
  isOpen: boolean;
  status?: TaskStatus;
  selectedTask?: Task | null;
  deleteModalOpen: boolean;
  title: string; // New state for task title
  description: string; // New state for task description
}

interface TasksState {
  selectedTask?: Task;
  tasks: Task[];
  editorState: EditorState; // Added editor state to the main state
}

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("/api/tasks");
  return response.data;
});

export const addTaskAsync = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "id">) => {
    const response = await axios.post("/api/tasks", task);
    return response.data; // Assuming the API returns the created task
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, body }: { id: string; body: Partial<Task> }) => {
    const response = await axios.put(`/api/tasks/${id}`, body, {
      headers: {
          'Content-Type': 'application/json', // Ensure the content type is set
      },
  })
    return response.data; // Assuming the API returns the updated task
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await axios.delete(`/api/tasks/${id}`);
    return id; // Return the id of the deleted task
  }
);

const initialState: TasksState = {
  selectedTask: undefined,
  tasks: [],
  editorState: {
    isOpen: false,
    selectedTask: null,
    deleteModalOpen: false,
    title: "",
    description: "",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      console.log(action.payload)
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; body: Partial<Task> }>
    ) {
      const taskIndex = state.tasks.findIndex(
        (t) => t.id === action.payload.id
      );
      if (taskIndex !== -1) {
        // Create a new task object with updated properties
        const updatedTask = {
          ...state.tasks[taskIndex],
          ...action.payload.body,
        };

        // Replace the old task with the updated task
        state.tasks[taskIndex] = updatedTask;
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
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
    },

    // New reducers for editor state management
    setEditorState(state, action: PayloadAction<Partial<EditorState>>) {
      state.editorState = { ...state.editorState, ...action.payload };
    },

    resetEditorState(state) {
      state.editorState = {
        ...state.editorState,
        isOpen: false,
        deleteModalOpen: false,
        title: "",
        description: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const taskIndex = state.tasks.findIndex(
            (t) => t.id === action.payload.id
          );
          if (taskIndex !== -1) {
            state.tasks[taskIndex] = action.payload; // Update the task in the state
          }
        }
      )
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload
          ); // Remove the deleted task
        }
      );
  },
});

// Exporting actions
export const {
  setTasks,
  addTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  selectTask,
  setEditorState,
  resetEditorState,
} = tasksSlice.actions;
export default tasksSlice.reducer;
