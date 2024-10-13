import React, { act } from 'react'
import { Provider } from 'react-redux'
import TaskBoard from '@/components/tasks/TaskBoard'
import { store } from '@/store'
import { SocketProvider } from '@/providers/socket-provider'
import { TaskProviderProvider } from '@/providers/tasks-provider'
import { getTasks } from '@/services/taskService'
import { fetchUserRecord } from '@/services/userService'
import { getDictionary } from '@/app/[lang]/dictonaries'
import '@testing-library/jest-dom'
import {  render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import { useTasks as mockedUseTasks } from '@/hooks/useTasks' // Import the mocked hook

// Mock the asynchronous functions
jest.mock('@/services/taskService', () => ({
  getTasks: jest.fn().mockResolvedValue([
    { id: '1', title: 'Test Task TODO', description: '', status: 'TODO' },
    { id: '2', title: 'Test Task BACKLOG', description: '', status: 'BACKLOG' },
    { id: '3', title: 'Task to Progress', description: '', status: 'TODO' }
  ])
}))

jest.mock('@/services/userService', () => ({
  fetchUserRecord: jest
    .fn()
    .mockResolvedValue({ id: 1, name: 'Test User', email: 'Email', teamId: 'Test-team' })
}))

// jest.mock('@/hooks/useTasks', () => ({
//   useTasks: jest.fn()
// }))

describe('TaskBoard Component', () => {
  let tasks, user, dict

  beforeEach(async () => {
    jest.clearAllMocks()

    // Fetch necessary data before each test
    tasks = await getTasks('')
    user = await fetchUserRecord()
    dict = await getDictionary('en')

    // Render the component before each test
    render(
      <Provider store={store}>
        <TaskProviderProvider value={{ tasks, dict: dict.tasks, user }}>
          <SocketProvider>
            <TaskBoard />
          </SocketProvider>
        </TaskProviderProvider>
      </Provider>
    )
  })

  it('renders TaskBoard with columns and tasks', () => {
    // Check for column headers
    expect(screen.getByText('BACKLOG')).toBeInTheDocument()
    expect(screen.getByText('TODO')).toBeInTheDocument()
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument()
    expect(screen.getByText('COMPLETE')).toBeInTheDocument()
  }),

  it('renders tasks in their respective columns', () => {
      // Check if task with status TODO is in TODO column
      const todoColumn = screen.getByTestId(`container-TODO`)
      expect(todoColumn).toHaveTextContent('Test Task TODO')

      // Check if task with status BACKLOG is in BACKLOG column
      const backlogColumn = screen.getByTestId(`container-BACKLOG`)
      expect(backlogColumn).toHaveTextContent('Test Task BACKLOG')
  })

  // This doesnt work for some reason
  // it('updates task status on drag end', async () => {
  //   const taskElement = screen.getByTestId('task-2')
  //   const targetColumn = screen.getByTestId(`container-IN PROGRESS`)

  //   // Ensure targetColumn is found
  //   expect(targetColumn).toBeInTheDocument()

  //   await act(async () => {
  //     // Simulate dragStart
  //     fireEvent.dragStart(taskElement, {
  //       dataTransfer: {
  //         setData: jest.fn(),
  //         getData: jest.fn(),
  //         dropEffect: 'move'
  //       }
  //     })

  //     // Assert that onDragStart was called
  //     expect(mockedUseTasks().onDragStart).toHaveBeenCalled()

  //     // Simulate dragOver
  //     fireEvent.dragOver(targetColumn!, {
  //       dataTransfer: {
  //         setData: jest.fn(),
  //         getData: jest.fn(),
  //         dropEffect: 'move'
  //       }
  //     })

  //     // Simulate drop
  //     fireEvent.drop(targetColumn!, {
  //       dataTransfer: {
  //         setData: jest.fn(),
  //         getData: jest.fn(),
  //         dropEffect: 'move'
  //       }
  //     })

  //     // Simulate dragEnd
  //     fireEvent.dragEnd(taskElement)
  //   })

  //   // Check if onDragEnd was called with the correct arguments
  //   await waitFor(() => {
  //     expect(mockedUseTasks().onDragEnd).toHaveBeenCalled()
  //   })
  // })
})
