
import { useTaskEditor } from '@/hooks/useTaskEditor'
// import trashicon from '../../../assets/Trash.svg'
import Button from '../Button'
import Drawer from '../Drawer'
import ListBox from '../ListBox'
import Modal from '../Modal'
import Input from '../Input'


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
    setDeleteModalOpen
  } = useTaskEditor()
  return (
    <Drawer isOpen={isOpen} close={close} title={selectedTask ? 'Edit Task' : 'Create Task'}>
      {selectedTask && (
        <img
          // src={trashicon}
          className="absolute h-5 w-5 right-6 -top-12 cursor-pointer"
          onClick={() => setDeleteModalOpen(true)}
        />
      )}
      <form className="flex flex-col gap-3 h-full" onSubmit={onSubmit}>
        <Input
          name="title"
          type="text"
          value={formData.title}
          onChange={e => handleChange({ name: e.target.name, value: e.target.value })}
          required
          label="Task Title"
        />

        <Input
          name="description"
          type="text"
          value={formData.description || ''}
          onChange={e => handleChange({ name: e.target.name, value: e.target.value })}
          label="Task Description"
        />

        <ListBox
          label="Status"
          options={['COMPLETE', 'IN_PROGRESS', 'BACKLOG', 'TODO']}
          selected={formData.status!}
          setSelected={s => handleChange({ name: 'status', value: s })}
        />
        <div className="mt-auto flex gap-2">
          <Button className="bg-white !text-black border hover:bg-stone-50" onClick={close}>
            Cancel
          </Button>
          <Button loading={loading} type="submit">
            Save
          </Button>
        </div>
      </form>

      {/* Delete Task Dialog Modal */}
      <Modal isOpen={deleteModalOpen} close={() => setDeleteModalOpen(false)} title="Delete Task?">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this task? This cannot be recovered
        </p>

        <div className="mt-8 pb-2 flex gap-2">
          <Button className="bg-white !text-black border hover:bg-stone-50" onClick={close}>
            Cancel
          </Button>
          <Button loading={isDeleting} onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </Drawer>
  )
}

export default TaskEditor
