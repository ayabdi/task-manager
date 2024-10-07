import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type TaskStatus = "BACKLOG" | "TODO" | "IN PROGRESS" | "DONE";
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
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

const initialState: TasksState = {
  selectedTask: undefined,
  tasks: [
    // Example initial tasks
    { id: "1", title: "Task 1", status: "TODO" },
    { id: "2", title: "Task 2", status: "IN PROGRESS" },
    { id: "3", title: "Task 3", status: "DONE" },
  ],
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
    addTask(state, action: PayloadAction<Omit<Task, "id">>) {
      const newTask: Task = {
        id: Date.now().toString(),

        ...action.payload,
      };
      state.tasks.push(newTask);
    },

    updateTask(state, action: PayloadAction<{ id: string; body: Partial<Task> }>) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.body);
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
        isOpen: false,
        selectedTask: null,
        deleteModalOpen: false,
        title: "",
        description: "",
      };
    },

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

// Exporting actions
export const {
  addTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  selectTask,
  setEditorState,
  resetEditorState,
} = tasksSlice.actions;
export default tasksSlice.reducer;
