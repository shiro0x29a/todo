import styles from '../styles/TaskList.module.css'

function TaskList({ tasks, taskToggle, handleEdit, handleDeleteClick }) {
  return (
    <div className={styles.taskList}>
      {tasks.length ? (
        tasks.map(task => (
          <div
            key={task.id}
            className={`${styles.task} ${
              task.isCompleted ? styles.completed : ''
            }`}
          >
            <div className={styles.taskWrap}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => taskToggle(task.id)}
              />

              <div className={styles.taskText}>{task.text}</div>

              <div className={styles.taskMenu}>
                <button
                  className={`${styles.btn} ${styles.delete}`}
                  onClick={() => handleDeleteClick(task.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>

                <button
                  className={`${styles.btn} ${styles.edit}`}
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>

            <div className={styles.timeStamp}>
              {task.edited
                ? `Edited: ${task.edited}`
                : `Created: ${task.created}`}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.empty}>There are no tasks</div>
      )}
    </div>
  )
}

export default TaskList
