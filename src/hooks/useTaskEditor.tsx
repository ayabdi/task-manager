import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  addTask,
  deleteTask,
  resetEditorState,
  setEditorState,
  Task,
  updateTask,
} from "@/store/tasks";
import useSocketEvents from "./useSocketEvents";

export const useTaskEditor = () => {
  // Global Task Editor States
  const { editorState } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const { emitAddTask, emitTaskUpdate } = useSocketEvents(); // Call the socket event handler

  const [formData, setFormData] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "BACKLOG",
  });

  // Form Functions
  const handleChange = (e: { name: string; value: string }) => {
    const { name, value } = e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const close = () => {
    dispatch(resetEditorState());
    // resetFormData();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!!editorState.selectedTask && !!formData) {
        emitTaskUpdate({ ...formData, id: editorState.selectedTask.id });
      } else {
        await emitAddTask(formData);
      }

      close();
    } catch {}
  };

  const onDelete = () => {
    const taskId = editorState.selectedTask?.id;
    if (!taskId) return;
    dispatch(deleteTask(taskId));
  };

  // Set Initial Form State
  useEffect(() => {
    if (!editorState) return;

    const { selectedTask, status } = editorState;
    if (editorState || status) {
      setFormData({
        title: selectedTask?.title || "",
        status: selectedTask?.status || status!,
        description: selectedTask?.description || "",
      });
    }
  }, [editorState.selectedTask, editorState.status]);

  return {
    selectedTask: editorState.selectedTask,
    formData,
    isOpen: editorState.isOpen,
    handleChange,
    close,
    onSubmit,
    onDelete,
    loading: false,
    isDeleting: false,
    setDeleteModalOpen: (bool: boolean) =>
      setEditorState({ deleteModalOpen: bool }),
    deleteModalOpen: editorState.deleteModalOpen,
  };
};
