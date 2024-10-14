"use client";
import React from 'react'
import { useTaskEditor } from "@/app/hooks/useTaskEditor";
import Button from "../Button";
import Drawer from "../Drawer";
import ListBox from "../ListBox";
import Modal from "../Modal";
import Input from "../Input";
import { useTaskProvider } from "@/app/providers/tasks-provider";

const TaskEditor = () => {
  const {
    selectedTask,
    formData,
    handleChange,
    isOpen,
    close,
    onSubmit,
    onDelete,
    loading,
    isDeleting,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useTaskEditor();

  const { dict } = useTaskProvider();
  return (
    <Drawer
      isOpen={isOpen}
      close={close}
      title={selectedTask ? dict.editTask : dict.createTask}
    >
      {selectedTask && (
        <img
          src="/icons/Trash.svg"
          alt="delete"
          className="absolute h-5 w-5 right-6 -top-12 cursor-pointer"
          width={5}
          height={5}
          onClick={() => setDeleteModalOpen(true)}
        />
      )}
      <form  data-testid="task-editor-form" className="flex flex-col gap-3 h-full" onSubmit={onSubmit}>
        <Input
          name="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            handleChange({ name: e.target.name, value: e.target.value })
          }
          required
          dataTestId="task-title-input"
          label={dict.taskTitle}
        />

        <Input
          name="description"
          type="text"
          value={formData.description || ""}
          dataTestId="task-description-input"
          onChange={(e) =>
            handleChange({ name: e.target.name, value: e.target.value })
          }
          label={dict.taskDescription}
        />

        <ListBox
          label={dict.status}
          options={["COMPLETE", "IN_PROGRESS", "BACKLOG", "TODO"]}
          selected={formData.status!}
          setSelected={(s) => handleChange({ name: "status", value: s })}
        />
        <div className="mt-auto flex gap-2">
          <Button
            className="bg-white !text-black border hover:bg-stone-50"
            onClick={close}
          >
            {dict.cancel}
          </Button>
          <Button loading={loading} type="submit">
            {dict.save}
          </Button>
        </div>
      </form>

      {/* Delete Task Dialog Modal */}
      <Modal
        isOpen={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        title={dict.deleteTask}
      >
        <p className="text-sm text-gray-500">{dict.deleteConfirmation}</p>

        <div className="mt-8 pb-2 flex gap-2">
          <Button
            className="bg-white !text-black border hover:bg-stone-50"
            onClick={close}
          >
            {dict.cancel}
          </Button>
          <Button loading={isDeleting} onClick={onDelete}>
            {dict.delete}
          </Button>
        </div>
      </Modal>
    </Drawer>
  );
};

export default TaskEditor;
