import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import Filter from '../components/Filter'
import SortOptions from '../components/SortOptions'
import TaskList from '../components/TaskList'
import Pagination from '../components/Pagination'
import DeletePopup from '../components/DeletePopup'

import styles from '../styles/Todo.module.css'

export default function Todo() {
  return (
      <div className={styles.todo}>
      <Header />

      <TaskForm
        SortOptions={
          <SortOptions
          />
        }
        Filter={
          <Filter
          />
        }
      />

      <TaskList
      />

      <Pagination
      />

      <DeletePopup
      />
      </div>
  )
}
