'use client'

// Import necessary modules and types
import { setTasks, Task } from '@/store/tasks'
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux'

// Define UserType interface for user information
export interface UserType {
  name: string | null
  email: string
  teamId: string | null
}

// Define TaskProviderType interface for context value
interface TaskProviderType {
  dict: any
  tasks: Task[]
  user: UserType
}

// Create a context for task provider
const TaskProvider = createContext<TaskProviderType | undefined>(undefined)

// TaskProviderProvider component to provide context value
export const TaskProviderProvider: React.FC<{
  value: TaskProviderType
  children: React.ReactNode
}> = ({ value, children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the tasks to the Redux store when the provider mounts
    if (value.tasks) {
      dispatch(setTasks(value.tasks))
    }
  }, [dispatch, value.tasks])

  return <TaskProvider.Provider value={value}>{children}</TaskProvider.Provider>
}

// Custom hook to use TaskProvider context
export const useTaskProvider = () => {
  const context = useContext(TaskProvider)
  if (!context) {
    throw new Error('useTaskProvider must be used within a MyContextProvider')
  }
  return context
}
