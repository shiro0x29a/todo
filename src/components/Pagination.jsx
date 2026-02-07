import styles from '../styles/Pagination.module.css'
import { useTranslation } from '../hooks/useTranslation'

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const { t } = useTranslation();
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

export default Pagination
