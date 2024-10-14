import React from 'react'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from 'react'
import TaskCard from './TaskCard'
import { setEditorState, Task, TaskStatus } from '@/app/store/tasks'
import { useAppDispatch } from '@/app/store'
import { useTaskProvider } from '@/app/providers/tasks-provider'

interface Props {
  column: string
  columnColor: string
  tasks: Task[]
}

const ColumnContainer: React.FC<Props> = ({ column, tasks, columnColor }) => {
  const { dict } = useTaskProvider()
  const dispatch = useAppDispatch()

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id)
  }, [tasks])

  const { setNodeRef, transform, transition } = useSortable({
    id: column,
    data: {
      type: 'Column',
      column
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    maxHeight: 'calc(100vh - 300px)'
  }

  const colorStyles: any = {
    blue: {
      bg: 'bg-blue-50',
      tag: 'bg-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      tag: 'bg-green-200'
    },
    orange: {
      bg: 'bg-orange-50',
      tag: 'bg-orange-200'
    },
    gray: {
      bg: 'bg-gray-50',
      tag: 'bg-gray-200'
    }
  }

  const { bg: bgColumnHeader, tag: bgColumnTag } = colorStyles[columnColor] || colorStyles['blue']!

  const createNew = () => {
    dispatch(
      setEditorState({
        isOpen: true,
        status: column as TaskStatus
      })
    )
  }
  return (
    <div
      key={column}
      ref={setNodeRef}
      style={style}
      className="w-[290px] rounded-md flex flex-col font-Inter"
    >
      {/* Column title */}
      <div className={`text-sm ${bgColumnHeader} h-[80px] rounded-md px-4 py-3 font-bold flex flex-col`}>
        <div className="flex">
          <div className={`${bgColumnTag} rounded-xl px-[22px]`}>{dict[column]}</div>
        </div>
        <button
          data-testid={`${column}-add-task`}
          className="flex text-stone-500 font-medium my-3 mx-2 cursor-pointer"
          onClick={createNew}
        >
          + {dict.addTask}
        </button>
      </div>

      {/* Column task container */}
      <div
        className="flex flex-grow flex-col mt-2.5 gap-2.5 overflow-x-hidden scrollbar-hide"
        data-testid={`container-${column}`}
      >
        <SortableContext items={tasksIds}>
          {tasks.map(task => (
            <TaskCard key={task?.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default ColumnContainer
