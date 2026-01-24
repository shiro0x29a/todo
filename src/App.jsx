import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTodo] = useState([])

// INIT
useEffect(() => {
  const newTodo = JSON.parse(localStorage.getItem('tasks'))
  if (newTodo) {
    setTodo(newTodo)
  }
}, [])
useEffect(() => {
  localStorage.tasks = JSON.stringify(tasks)
}, [tasks])

// handleTasks
function handleSubmit(e) {
  if (!taskText) return
    e.preventDefault()
  const isCompleted = ''
  const task = {id: tasks.length+1, isCompleted: '', text: taskText, created: getFormattedTimestamp(), edited: ''}
  setTodo(prev => [task, ...prev])
  setTaskText('')
}

function taskToggle(id) {
  const newTodo = tasks.map(t => {
    if (t.id === id) {
      return { ...t, isCompleted: !t.isCompleted }
    }
    return t
  })
  setTodo(newTodo)
}

  const [selectedTask, setSelectedTask] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

function handleDeleteClick(id) {
  setSelectedTask(id)
  setShowPopup(true)
}

function handleConfirmDelete() {
  const newTodo = [...tasks].filter(task => task.id !== selectedTask)
  setTodo(newTodo)
  setShowPopup(false)
}

function handleCancelDelete() {
  setSelectedTask(null)
  setShowPopup(false)
}

function handleEdit(task) {
  const newText = prompt('Enter new description', task.text.trim())
  if (newText !== null) {
    const newTodo = tasks.map(t => {
      if (t.id === task.id) {
        return { ...t, text: newText, created: '', edited: getFormattedTimestamp() }
      }
      return t
    })
  setTodo(newTodo)
  }
}

function getFormattedTimestamp() {
  const now = new Date()
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
}

  const [filter, setFilter] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

// Filters
function handleFilter(e) {
  e.preventDefault()
  setShowFilter(!showFilter)
}

function filterAll() {
  setFilter('all')
}

function filterCompleted() {
  setFilter('completed')
}

function filterUncompleted() {
  setFilter('uncompleted')
}

if (filter === 'all') {
    console.log(1, filter)
}

// const filteredTasks = tasks.filter(task => {
//     if (filter === 'all') return true
//     if (filter === 'completed') return task.isCompleted
//     if (filter === 'uncompleted') return !task.isCompleted
//     return true
//   })

const [sortBy, setSortBy] = useState('created-desc') // по умолчанию — новые сверху

const filteredTasks = sortTasks(
  tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.isCompleted
    if (filter === 'uncompleted') return !task.isCompleted
    return true
  })
)

console.log(filteredTasks)

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    let dateA, dateB;

    if (sortBy.includes('created')) {
      dateA = new Date(a.created)
      dateB = new Date(b.created)
    } else {
      dateA = a.edited ? new Date(a.edited) : new Date(a.created)
      dateB = b.edited ? new Date(b.edited) : new Date(b.created)
    }

    if (sortBy.endsWith('asc')) {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })
}

  return (
    <>
    <form id="taskForm" noValidate>
      <input onChange={e => setTaskText(e.target.value)} value={taskText} id="taskInput" placeholder="Enter task description..."/>
      <button onClick={e => handleSubmit(e)} id="createTask">Add task</button>
      <button onClick={(e) => handleFilter(e)} id="filter">All</button>
      {showFilter && (
      <div id="filters">
        <ul>
          <li
            onClick={() => filterAll()}
            className={`filter-all ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </li>
          <li
            onClick={() => filterCompleted()}
            className={`filter-completed ${filter === 'completed' ? 'active' : ''}`}
          >
            Only completed
          </li>
          <li
            onClick={() => filterUncompleted()}
            className={`filter-uncompleted ${filter === 'uncompleted' ? 'active' : ''}`}
          >
            Only uncompleted
          </li>
        </ul>
      </div>
        )}
    </form>

    <div id="sortOptions">
      <span>Sort by:</span>
      <button 
        className={sortBy === 'created-desc' ? 'active' : ''} 
        onClick={() => setSortBy('created-desc')}
      >
        Newest
      </button>
      <button 
        className={sortBy === 'created-asc' ? 'active' : ''} 
        onClick={() => setSortBy('created-asc')}
      >
        Oldest
      </button>
      <button 
        className={sortBy === 'edited-desc' ? 'active' : ''} 
        onClick={() => setSortBy('edited-desc')}
      >
        Recently Edited
      </button>
      <button 
        className={sortBy === 'edited-asc' ? 'active' : ''} 
        onClick={() => setSortBy('edited-asc')}
      >
        Least Recently Edited
      </button>
    </div>

    <div className="taskList">
      {filteredTasks.length ? (
          filteredTasks.map(task => (
    <div key={task.id} className={`task ${task.isCompleted ? 'completed' : null}`}>
  <div className="taskWrap">
  <input onClick={() => taskToggle(task.id)} type="checkbox" className="checkbox" checked={task.isCompleted ? true : false}/>
  <div className="taskText">{task.text}</div>
  <div className="taskMenu">
    <button onClick={() => handleDeleteClick(task.id)} className="btn btn-danger delete"><i className="fa-solid fa-trash"></i></button>
    <button onClick={() => handleEdit(task)} className="btn edit"><i className="fa-solid fa-pen"></i></button>
  </div>
  </div>
  <div className="timeStamp">{task.edited ? 'Edited: '+task.edited : 'Created: '+task.created}</div>
      </div> )
          )
      ) : (
          <div className="empty">There are no tasks</div>
      )}
    </div>

    {showPopup && (
        <div className="popupDelete">
          <p>Are you sure you want to delete the task?</p>
          <div className="popupButtons">
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
