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

  const { emitAddTask, emitTaskUpdate, emitDeleteTask } = useSocketEvents(); // Call the socket event handler

  const initialFormState: Omit<Task, "id"> = {
    title: "",
    description: "",
    status: "BACKLOG",
  };
  const [formData, setFormData] = useState<Omit<Task, "id">>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Functions
  const handleChange = (e: { name: string; value: string }) => {
    const { name, value } = e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const close = () => {
    dispatch(resetEditorState());
    setFormData(initialFormState);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      if (!!editorState.selectedTask && !!formData) {
        emitTaskUpdate({ ...formData, id: editorState.selectedTask.id });
      } else {
        await emitAddTask(formData);
      }

      close();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    const taskId = editorState.selectedTask?.id;
    if (!taskId) return;

    try {
      setIsDeleting(true)
      await emitDeleteTask(taskId);
      close();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
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
    loading: isSubmitting,
    isDeleting: isDeleting,
    setDeleteModalOpen: (bool: boolean) =>
      dispatch(setEditorState({ deleteModalOpen: bool })),
    deleteModalOpen: editorState.deleteModalOpen,
  };
};
