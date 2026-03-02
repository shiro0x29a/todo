export function useDeletePopup({
  selectedTask,
  setSelectedTask,
  showPopup,
  setShowPopup,
  handleDelete
}) {
  function handleDeleteClick(id) {
    setSelectedTask(id)
    setShowPopup(true)
  }

  function handleConfirmDelete() {
    handleDelete(selectedTask)
    setShowPopup(false)
    setSelectedTask(null)
  }

  function handleCancelDelete() {
    setSelectedTask(null)
    setShowPopup(false)
  }

  return {
    showPopup,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete
  }
}
