"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "@/store";
import { setEditorState, Task } from "@/store/tasks";
import Image from "next/image";

interface Props {
  task?: Task;
}

function TaskCard({ task }: Props) {
  const dispatch = useAppDispatch();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task?.id || "",
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative"
      />
    );
  }

  const selectTask = () => {
    if (!task) return;
    dispatch(
      setEditorState({
        selectedTask: task,
        isOpen: true,
      })
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col border p-4 h-max rounded-md gap-2.5 hover:ring-1 hover:ring-inset hover:ring-background-blue-50 cursor-grab relative task font-Inter"
      onDoubleClick={selectTask}
    >
      <div className="flex w-full max-h-20 overflow-clip">
        {task?.title}

        <div className="flex ml-auto gap-1">
          <Image
            src="../icons/edit.svg"
            alt="edit"
            height={4}
            width={4}
            className="h-4 w-4 ml-auto cursor-pointer"
            onClick={selectTask}
          />
        </div>
      </div>

      <div className="text-xs text-stone-400 overflow-clip h-max">
        {task?.description}
      </div>
    </div>
  );
}

export default TaskCard;
