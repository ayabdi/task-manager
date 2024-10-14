"use client";


import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React from 'react'
import { createPortal } from 'react-dom'
import ColumnContainer from './ColumnContainer'

import TaskCard from './TaskCard'
import { useTasks } from '@/app/hooks/useTasks'
import { Task } from '@/app/store/tasks'

export interface ColumnType {
  name: string
  color: string
  tasks: Task[]
}

const TaskBoard: React.FC = () => {
  const { activeColumn, activeTask, columnsId, sensors, columns, onDragEnd, onDragStart } = useTasks()

  return (
    <div className="text-text-active mx-auto my-5 flex">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-6">
          <SortableContext items={columnsId}>
            {columns?.map(col => (
              <ColumnContainer
                key={col.name}
                columnColor={col.color || 'blue'}
                column={col.name}
                tasks={col.tasks}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                key={'drag'}
                column={activeColumn.name}
                columnColor={activeColumn.color}
                tasks={activeColumn.tasks}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default TaskBoard
