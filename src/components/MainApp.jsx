import { TodoProvider } from '../context/TodoContext';

import Header from './Header'
import TaskForm from './TaskForm'
import Filter from './Filter'
import SortOptions from './SortOptions'
import TaskList from './TaskList'
import Pagination from './Pagination'
import DeletePopup from './DeletePopup'

export default function TodoPage() {
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
