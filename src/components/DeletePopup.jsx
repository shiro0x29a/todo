import styles from '../styles/DeletePopup.module.css'
import { useTranslation } from '../hooks/useTranslation'
import { useDeletePopupContext } from '../context/DeletePopupContext'
import { useTodoContext } from '../context/TodoContext'

export default function DeletePopup({
}) {
  const { t } = useTranslation();

  const {
    handleConfirmDelete
  } = useTodoContext()

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
