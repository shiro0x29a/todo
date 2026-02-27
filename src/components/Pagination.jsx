import styles from '../styles/Pagination.module.css'
import { useTranslation } from '../hooks/useTranslation'
import { useTodoContext } from '../context/TodoContext'

export default function Pagination({
}) {
  const { t } = useTranslation();
  const {
    currentPage,
    totalPages,
    setCurrentPage
  } = useTodoContext()

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
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
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {t('next')}
      </button>
    </div>
  )
}

