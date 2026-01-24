// export function TaskList({ tasks, taskToggle, handleEdit, handleDeleteClick }) {
//   return (
//     <div className="taskList">
//       {tasks.length ? (
//         tasks.map(task => (
//           <div key={task.id} className={`task ${task.isCompleted ? 'completed' : ''}`}>
//             <input
//               type="checkbox"
//               checked={task.isCompleted}
//               onChange={() => taskToggle(task.id)}
//             />
//             <div>{task.text}</div>
//             <button onClick={() => handleDeleteClick(task.id)}>🗑</button>
//             <button onClick={() => handleEdit(task)}>✏️</button>
//             <div>{task.edited ? 'Edited: ' + task.edited : 'Created: ' + task.created}</div>
//           </div>
//         ))
//       ) : (
//         <div className="empty">There are no tasks</div>
//       )}
//     </div>
//   )
// }

function TaskList({ tasks, taskToggle, handleEdit, handleDeleteClick }) {
  return (
    <div className="taskList">
      {tasks.length ? (
        tasks.map(task => (
          <div
            key={task.id}
            className={`task ${task.isCompleted ? 'completed' : ''}`}
          >
            <div className="taskWrap">
              <input
                type="checkbox"
                className="checkbox"
                checked={task.isCompleted}
                onChange={() => taskToggle(task.id)}
              />

              <div className="taskText">{task.text}</div>

              <div className="taskMenu">
                <button
                  className="btn btn-danger delete"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>

                <button
                  className="btn edit"
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>

            <div className="timeStamp">
              {task.edited
                ? `Edited: ${task.edited}`
                : `Created: ${task.created}`}
            </div>
          </div>
        ))
      ) : (
        <div className="empty">There are no tasks</div>
      )}
    </div>
  )
}

export default TaskList
