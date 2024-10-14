import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

// Define possible task statuses
export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN PROGRESS' | 'DONE'

// Task interface representing a task object
export interface Task {
  id: string
  title: string
  description?: string | null
  status: TaskStatus | string
}

// Editor state interface for managing task editor state
interface EditorState {
  isOpen: boolean
  status?: TaskStatus
  selectedTask?: Task | null
  deleteModalOpen: boolean
  title: string // State for task title
  description: string // State for task description
}

// Main tasks state interface
interface TasksState {
  selectedTask?: Task
  tasks: Task[]
  editorState: EditorState // Editor state included in main state
}

// Async thunk for adding a task
export const addTaskAsync = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>) => {
  try {
    const response = await axios.post('/api/tasks', task)
    return response.data // Return created task
  } catch (error) {
    toast.error('Failed to add task. Please try again.') // Report error
    throw error // Re-throw error to handle it in the calling code
  }
})

// Async thunk for updating a task
export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, body }: { id: string; body: Partial<Task> }) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, body, {
        headers: {
          'Content-Type': 'application/json' // Set content type
        }
      })
      return response.data // Return updated task
    } catch (error) {
      toast.error('Failed to update task. Please try again.') // Report error
      throw error // Re-throw error to handle it in the calling code
    }
  }
)

// Async thunk for deleting a task
export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  try {
    await axios.delete(`/api/tasks/${id}`)
    return id // Return the id of the deleted task
  } catch (error) {
    toast.error('Failed to delete task. Please try again.') // Report error
    throw error // Re-throw error to handle it in the calling code
  }
})


// Initial state for tasks
const initialState: TasksState = {
  selectedTask: undefined,
  tasks: [],
  editorState: {
    isOpen: false,
    selectedTask: null,
    deleteModalOpen: false,
    title: '',
    description: ''
  }
}

// Create tasks slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload // Set tasks from payload
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload) // Add new task
    },
    updateTask(state, action: PayloadAction<{ id: string; body: Partial<Task> }>) {
      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id)
      if (taskIndex !== -1) {
        // Update existing task
        const updatedTask = {
          ...state.tasks[taskIndex],
          ...action.payload.body
        }
        state.tasks[taskIndex] = updatedTask // Replace old task
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload) // Remove deleted task
    },
    updateTaskStatus(state, action: PayloadAction<{ id: string; status: Task['status'] }>) {
      const task = state.tasks.find(t => t.id === action.payload.id)
      if (task) {
        task.status = action.payload.status // Update task status
      }
    },
    selectTask(state, action: PayloadAction<Task | undefined>) {
      state.selectedTask = action.payload // Set selected task
    },
    // Manage editor state
    setEditorState(state, action: PayloadAction<Partial<EditorState>>) {
      state.editorState = { ...state.editorState, ...action.payload } // Update editor state
    },
    resetEditorState(state) {
      state.editorState = {
        ...state.editorState,
        isOpen: false,
        deleteModalOpen: false,
        title: '',
        description: ''
      } // Reset editor state
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload) // Add task on successful addition
      })
      .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id)
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload // Update task in state
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload) // Remove task from state
      })
  }
})

// Export actions for use in components
export const {
  setTasks,
  addTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  selectTask,
  setEditorState,
  resetEditorState
} = tasksSlice.actions

export default tasksSlice.reducer // Export reducer
