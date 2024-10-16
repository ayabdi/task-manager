'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppDispatch } from '@/app/store'
import { setEditorState, Task } from '@/app/store/tasks'

interface Props {
  task?: Task
}

function TaskCard({ task }: Props) {
  // Import necessary hooks and utilities
  const dispatch = useAppDispatch()

  // Set up sortable properties for the task
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task?.id || '', // Unique identifier for the task
    data: {
      type: 'Task', // Type of draggable item
      task
    }
  })

  // Define style for the task card based on dragging state
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  // Render a placeholder when the task is being dragged
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative"
      />
    )
  }

  // Function to select the task and open the editor
  const selectTask = () => {
    if (!task) return // Exit if no task is provided
    dispatch(
      setEditorState({
        selectedTask: task, // Set the selected task
        isOpen: true // Open the editor
      })
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col border p-4 h-max rounded-md gap-2.5 hover:ring-1 hover:ring-inset hover:ring-background-blue-50 cursor-grab relative task font-Inter"
      onDoubleClick={selectTask}
      data-testid={`task-${task?.id}`}
    >
      <div className="flex w-full max-h-20 overflow-clip">
        {task?.title}

        <div className="flex ml-auto gap-1">
          <img
            src="/icons/edit.svg"
            alt="edit"
            height={4}
            width={4}
            className="h-4 w-4 ml-auto cursor-pointer"
            onClick={selectTask}
          />
        </div>
      </div>

      <div className="text-xs text-stone-400 overflow-clip h-max">{task?.description}</div>
    </div>
  )
}

export default TaskCard
