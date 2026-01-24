function DeletePopup({ onConfirm, onCancel }) {
  return (
    <div className="popupDelete">
      <p>Are you sure you want to delete the task?</p>

      <div className="popupButtons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  )
}

export default DeletePopup
