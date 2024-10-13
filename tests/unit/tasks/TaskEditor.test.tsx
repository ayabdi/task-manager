import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskEditor from '@/components/tasks/TaskEditor'
import tasksSlice, { setTasks, setEditorState } from '@/store/tasks'
import { SocketProvider } from '@/providers/socket-provider'
import { TaskProviderProvider } from '@/providers/tasks-provider'
import useSocketEvents from '@/hooks/useSocketEvents'
import { getDictionary } from '@/app/[lang]/dictonaries'


// Mock the useSocketEvents hook
const mockEmitAddTask = jest.fn()
const mockEmitTaskUpdate = jest.fn()
const mockEmitDeleteTask = jest.fn()

jest.mock('@/hooks/useSocketEvents', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    emitAddTask: mockEmitAddTask,
    emitTaskUpdate: mockEmitTaskUpdate,
    emitDeleteTask: mockEmitDeleteTask,
  })),
}))


// Create a mock Redux store
const store = configureStore({
  reducer: {
    tasks: tasksSlice
  }
})

describe('TaskEditor Component - Basic Render', () => {
  beforeEach(async () => {
    jest.clearAllMocks()

    // Dispatch setTasks to populate the store
    store.dispatch(setTasks([{ id: '1', title: 'Test Task', description: '', status: 'TODO' }]))

    // Dispatch setEditorState to open the editor
    store.dispatch(setEditorState({ isOpen: true }))

    const dict = await getDictionary('en')

    // Render the component
    render(
      <Provider store={store}>
        <TaskProviderProvider value={{ tasks: [], dict: dict.tasks, user: {} }}>
          <SocketProvider>
            <TaskEditor />
          </SocketProvider>
        </TaskProviderProvider>
      </Provider>
    )
  })

  it('renders the TaskEditor form when open', () => {
    const form = screen.getByTestId('task-editor-form')
    expect(form).toBeInTheDocument()
  }),
    it('renders all form fields and buttons', () => {
      // Check for title input
      const titleInput = screen.getByTestId('task-title-input')
      expect(titleInput).toBeInTheDocument()

      // Check for description input (if it exists)
      const descriptionInput = screen.queryByLabelText(/Task Description/i)
      if (descriptionInput) {
        expect(descriptionInput).toBeInTheDocument()
      }

      // Check for status select dropdown
      const statusSelect = screen.getByLabelText(/Status/i)
      expect(statusSelect).toBeInTheDocument()

      // Check for Save button
      const saveButton = screen.getByText(/Save/i)
      expect(saveButton).toBeInTheDocument()
    }),
    it('allows user to fill out the form', () => {
      // Fill out the title input
      const titleInput = screen.getByTestId('task-title-input')
      fireEvent.change(titleInput, { target: { value: 'New Task' } })
      expect(titleInput).toHaveValue('New Task')

      // Fill out the description input (if it exists)
      const descriptionInput = screen.queryByLabelText(/Task Description/i)
      if (descriptionInput) {
        fireEvent.change(descriptionInput, { target: { value: 'Task Description' } })
        expect(descriptionInput).toHaveValue('Task Description')
      }

      // Change the status
      const statusSelect = screen.getByLabelText(/Status/i)
      fireEvent.change(statusSelect, { target: { value: 'BACKLOG' } })
      expect(statusSelect).toHaveValue('BACKLOG')
    }),

    it('calls emitAddTask with correct data on form submission', async () => {
        // Fill out the title input
        const titleInput = screen.getByTestId('task-title-input')
        fireEvent.change(titleInput, { target: { value: 'New Task' } })
        expect(titleInput).toHaveValue('New Task')
    
        // Fill out the description input (if it exists)
        const descriptionInput = screen.getByTestId('task-description-input')
        if (descriptionInput) {
          fireEvent.change(descriptionInput, { target: { value: 'Task Description' } })
          expect(descriptionInput).toHaveValue('Task Description')
        }
    
        // Change the status
        const statusSelect = screen.getByLabelText(/Status/i)
        fireEvent.change(statusSelect, { target: { value: 'BACKLOG' } })
        expect(statusSelect).toHaveValue('BACKLOG')
    
        // Submit the form
        const saveButton = screen.getByText(/Save/i)
        fireEvent.click(saveButton)
    
        // Wait for the emitAddTask to be called with correct data
        await waitFor(() => {
          expect(mockEmitAddTask).toHaveBeenCalledTimes(1)
          expect(mockEmitAddTask).toHaveBeenCalledWith({
            title: 'New Task',
            description: 'Task Description',
            status: 'BACKLOG',
          })
        })
      })

    //   it('handles form submission errors gracefully', async () => {
    //     // Ensure the form is present
    //     const form = screen.getByTestId('task-editor-form')
    //     expect(form).toBeInTheDocument()
    
    //     // Fill out the title input
    //     const titleInput = screen.getByTestId('task-title-input')
    //     fireEvent.change(titleInput, { target: { value: 'New Task' } })
    //     expect(titleInput).toHaveValue('New Task')
    
    //     // Fill out the description input (if it exists)
    //     const descriptionInput = screen.getByTestId('task-description-input')
    //     if (descriptionInput) {
    //       fireEvent.change(descriptionInput, { target: { value: 'Task Description' } })
    //       expect(descriptionInput).toHaveValue('Task Description')
    //     }
    
    //     // Change the status
    //     const statusSelect = screen.getByLabelText(/Status/i)
    //     fireEvent.change(statusSelect, { target: { value: 'BACKLOG' } })
    //     expect(statusSelect).toHaveValue('BACKLOG')
    
    //     // Submit the form
    //     const saveButton = screen.getByText(/Save/i)
    //     fireEvent.click(saveButton)
    
    //     // Wait for the emitAddTask to be called and handle the rejection
    //     await waitFor(() => {
    //       expect(mockEmitAddTask).toHaveBeenCalledTimes(1)
    //       expect(mockEmitAddTask).toHaveBeenCalledWith({
    //         title: 'New Task',
    //         description: 'Task Description',
    //         status: 'BACKLOG',
    //       })
    //     })
    // })
})
