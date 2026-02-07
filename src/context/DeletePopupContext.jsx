import { createContext, useContext, useState } from 'react'

const DeletePopupContext = createContext(null)

export const useDeletePopupContext = () => {
  const context = useContext(DeletePopupContext)
  return context
}

export function DeletePopupProvider({ children }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  function handleDeleteClick(id) {
    setSelectedTask(id)
    setShowPopup(true)
  }

  function handleCancelDelete() {
    setSelectedTask(null)
    setShowPopup(false)
  }

  return (
    <DeletePopupContext.Provider
      value={{
        showPopup,
        selectedTask,
        setSelectedTask,
        handleDeleteClick,
        handleCancelDelete,
        setShowPopup
      }}
    >
      {children}
    </DeletePopupContext.Provider>
  )
}
