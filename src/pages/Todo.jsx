import { TodoProvider } from '../context/TodoContext';

import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import Filter from '../components/Filter'
import SortOptions from '../components/SortOptions'
import TaskList from '../components/TaskList'
import Pagination from '../components/Pagination'
import DeletePopup from '../components/DeletePopup'

export default function Todo() {
  return (
    <TodoProvider>
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
    </TodoProvider>
  )
}
