import styles from '../styles/DeletePopup.module.css'
import { useTranslation } from '../hooks/useTranslation'
import { useDeletePopupContext } from '../context/DeletePopupContext'

export default function DeletePopup({ handleConfirmDelete }) {
  const { t } = useTranslation();

  const {
    showPopup,
    handleCancelDelete
  } = useDeletePopupContext()

  if (!showPopup) return null

  return (
    <div className={styles.popupDelete}>
      <p>{t('todo.askDelete')}</p>

      <div className={styles.popupButtons}>
        <button onClick={handleConfirmDelete}>{t('yes')}</button>
        <button onClick={handleCancelDelete}>{t('no')}</button>
      </div>
    </div>
  )
}
