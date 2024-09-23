import { useTranslation } from 'react-i18next'
import styles from '../styles/footer.module.css'

export default function Footer() {

  const { t } = useTranslation()

  return (
    <div className={styles.footer}>{t('footer')}</div>
  )
}
