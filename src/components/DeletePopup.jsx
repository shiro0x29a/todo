import styles from '../styles/DeletePopup.module.css'
import { useDeletePopupContext } from '../context/DeletePopupContext'

export default function DeletePopup({ handleConfirmDelete }) {
  const {
    showPopup,
    handleCancelDelete
  } = useDeletePopupContext()

  if (!showPopup) return null

  return (
    <div className={styles.popupDelete}>
      <p>Are you sure you want to delete the task?</p>

      <div className={styles.popupButtons}>
        <button onClick={handleConfirmDelete}>Yes</button>
        <button onClick={handleCancelDelete}>No</button>
      </div>
    </div>
  )
}
