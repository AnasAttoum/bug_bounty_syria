import { useTranslation } from 'react-i18next'
import styles from '../styles/company.module.css'
import { IconTrash } from '@tabler/icons-react'
import SecondaryButton from '../components/buttons/SecondaryButton'
import { useState } from 'react'
import ModalAddProgram from '../components/Modal/ModalAddProgram'

export default function CompanyPrograms() {

  const { t } = useTranslation()
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat',minHeight:'72vh' }}>

        <div className='flex justify-center' onClick={()=>setSlowTransitionOpened(true)}>
          <SecondaryButton title={t('addProgram')} />
        </div>

        <div className='flex flex-col gap-5'>
          <div className={`${styles.head} flex justify-evenly`} style={{ color: 'var(--primary)', borderBottom: '1px solid var(--primary)' }}>
            <div style={{ width: '20vw', textAlign: 'center' }}>{t('programName')}</div>
            <div style={{ width: '20vw', textAlign: 'center' }}>{t('programLink')}</div>
            <div style={{ width: '40vw', textAlign: 'center' }}>{t('description')}</div>
            <div style={{ width: '5vw', textAlign: 'center' }}></div>
          </div>
          <div className={`${styles.row} flex gap-5 justify-evenly py-3`} style={{ borderBottom: '1px solid #999' }}>
            <div style={{ width: '20vw', textAlign: 'center' }}>البرنامج الأول</div>
            <div style={{ width: '20vw', textAlign: 'center', marginInline: '10px' }}>www.FirstApp.com</div>
            <div style={{ width: '40vw', textAlign: 'justify' }}>البرنامج الأول هو عبارة تطبيق يعمل حل مشكلة التطبيق الذي يعمل على إيجاد مشكلة لبرنامج معين بناء على تطبيقات</div>
            <IconTrash stroke={2} color='var(--primary)' style={{ cursor: 'pointer' }} />
          </div>
          <div className={`${styles.row} flex gap-5 justify-evenly py-3`}>
            <div style={{ width: '20vw', textAlign: 'center' }}>البرنامج الأول</div>
            <div style={{ width: '20vw', textAlign: 'center', marginInline: '10px' }}>www.FirstApp.com</div>
            <div style={{ width: '40vw', textAlign: 'justify' }}>البرنامج الأول هو عبارة تطبيق يعمل حل مشكلة التطبيق الذي يعمل على إيجاد مشكلة لبرنامج معين بناء على تطبيقات</div>
            <IconTrash stroke={2} color='var(--primary)' style={{ cursor: 'pointer' }} />
          </div>
        </div>


      </div>

      <ModalAddProgram slowTransitionOpened={slowTransitionOpened} setSlowTransitionOpened={setSlowTransitionOpened} />
    </>
  )
}
