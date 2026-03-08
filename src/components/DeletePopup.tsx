import styles from '../styles/DeletePopup.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { useTodoStore } from '../store/todo'
import { useDeleteTask } from '../hooks/useTasks'

export default function DeletePopup({
}) {
  const { t } = useTranslation();

  const showPopup = useTodoStore((s) => s.showPopup)
  const selectedTask = useTodoStore((s) => s.selectedTask)
  const closeDeletePopup = useTodoStore((s) => s.closeDeletePopup)

  const deleteTask = useDeleteTask()

  const handleConfirmDelete = () => {
    if (!selectedTask) return
    deleteTask.mutate(selectedTask)
    closeDeletePopup()
  }

  const handleCancelDelete = () => {
    closeDeletePopup()
  }

  if (!showPopup) return null

  return (
    <div className={styles.popupDelete}>
      <p>{t('todo.askDelete')}</p>

      <div className={styles.popupButtons}>
        <button onClick={handleConfirmDelete}>{t('yes')}</button>
        <button onClick={handleCancelDelete}>{t('no')}</button>
      </div>
    </div>
  )
}
