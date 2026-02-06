// function Pagination({ currentPage, totalPages, setCurrentPage }) {
//   if (totalPages <= 1) return null
//
//   return (
//     <div className="pagination">
//       <button
//         onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>
//
//       {Array.from({ length: totalPages }, (_, i) => (
//         <button
//           key={i + 1}
//           className={currentPage === i + 1 ? 'active' : ''}
//           onClick={() => setCurrentPage(i + 1)}
//         >
//           {i + 1}
//         </button>
//       ))}
//
//       <button
//         onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   )
// }
//
// export default Pagination

import styles from '../styles/Pagination.module.css'

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
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
        Next
      </button>
    </div>
  )
}

export default Pagination
