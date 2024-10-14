import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  resetEditorState,
  setEditorState,
  Task,
} from "@/app/store/tasks";
import useSocketEvents from "./useSocketEvents";

// Custom hook for managing task editor state
export const useTaskEditor = () => {
  // Global Task Editor States
  const { editorState } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const { emitAddTask, emitTaskUpdate, emitDeleteTask } = useSocketEvents();

  // Initial form state for task
  const initialFormState: Omit<Task, "id"> = {
    title: "",
    description: "",
    status: "BACKLOG",
  };

  // Local state for form data and submission status
  const [formData, setFormData] = useState<Omit<Task, "id">>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle input changes in the form
  const handleChange = (e: { name: string; value: string }) => {
    const { name, value } = e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Close the editor and reset form data
  const close = () => {
    dispatch(resetEditorState());
    setFormData(initialFormState);
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editorState.selectedTask && formData) {
        emitTaskUpdate({ ...formData, id: editorState.selectedTask.id });
      } else {
        await emitAddTask(formData);
      }
      close();
    } catch {
      // Handle error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle task deletion
  const onDelete = async () => {
    const taskId = editorState.selectedTask?.id;
    if (!taskId) return;

    try {
      setIsDeleting(true);
      await emitDeleteTask(taskId);
      close();
    } catch{
      // Handle error if needed
    } finally {
      setIsDeleting(false);
    }
  };

  // Set initial form state based on selected task
  useEffect(() => {
    if (!editorState) return;

    const { selectedTask, status } = editorState;
    if (selectedTask || status) {
      setFormData({
        title: selectedTask?.title || "",
        status: selectedTask?.status || status!,
        description: selectedTask?.description || "",
      });
    }
  }, [editorState]);

  // Return values and functions for the task editor
  return {
    selectedTask: editorState.selectedTask,
    formData,
    isOpen: editorState.isOpen,
    handleChange,
    close,
    onSubmit,
    onDelete,
    loading: isSubmitting,
    isDeleting,
    setDeleteModalOpen: (bool: boolean) =>
      dispatch(setEditorState({ deleteModalOpen: bool })),
    deleteModalOpen: editorState.deleteModalOpen,
  };
};
