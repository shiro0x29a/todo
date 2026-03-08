import styles from '../styles/Pagination.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { useTodoStore } from '../store/todo'

export default function Pagination({
}) {
  const { t } = useTranslation();

  const currentPage = useTodoStore((s) => s.currentPage)
  const totalPages = useTodoStore((s) => s.totalPages)
  const setCurrentPage = useTodoStore((s) => s.setCurrentPage)

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        {t('prev')}
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1
        return (
          <button
            key={page}
            className={`${styles.button} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        )
      })}

      <button
        className={styles.button}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {t('next')}
      </button>
    </div>
  )
}

