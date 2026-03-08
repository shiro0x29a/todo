import styles from '../styles/TaskList.module.css'
import { useTranslation } from '../hooks/useTranslation'
import { useTasksQuery } from '../hooks/useTasks'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { useTodoStore } from '../store/todo'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { t } = useTranslation()
  const { data: tasks = [] } = useTasksQuery()

  const filter = useTodoStore((s) => s.filter)
  const sortBy = useTodoStore((s) => s.sortBy)
  const filteredTasks = useSortTasks(tasks, filter, sortBy)

  const tasksPerPage = 5
  const { itemsForPage: tasksForPage } = usePagination(filteredTasks, tasksPerPage)

  return (
    <div className={styles.taskList}>
      {tasksForPage.length ? (
        tasksForPage.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <div className={styles.empty}>{t('todo.emptyList')}</div>
      )}
    </div>
  )
}
