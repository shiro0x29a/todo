import styles from '../styles/DeletePopup.module.css'

function DeletePopup({ onConfirm, onCancel }) {
  return (
    <div className={styles.popupDelete}>
      <p>Are you sure you want to delete the task?</p>

      <div className={styles.popupButtons}>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  )
}

export default DeletePopup
