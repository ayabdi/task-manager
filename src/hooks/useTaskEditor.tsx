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

export const useTaskEditor = () => {
  // Global Task Editor States
  const { editorState } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!!editorState.selectedTask && !!formData) {
        dispatch(
          updateTask({ id: editorState.selectedTask.id, body: formData })
        );
      } else {
        dispatch(addTask(formData));
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
