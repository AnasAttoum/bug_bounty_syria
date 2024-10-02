import { useTranslation } from 'react-i18next'
import styles from '../styles/company.module.css'
import { IconTrash } from '@tabler/icons-react'
import SecondaryButton from '../components/buttons/SecondaryButton'
import { useEffect, useState } from 'react'
import ModalAddProgram from '../components/Modal/ModalAddProgram'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../lib/store'
import { deleteProgram, getPrograms } from '../lib/slices/userSlice'

export default function CompanyPrograms() {

  const { t } = useTranslation()
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false)
  const { programs } = useSelector((state: RootState) => state.reducers.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getPrograms())
  }, [dispatch])

  const handleDelete = (uuid: string) => {
    const formData = new FormData()
    formData.append('uuid', uuid)
    dispatch(deleteProgram(formData))
  }

  return (
    <>
      <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat', minHeight: '72vh' }}>

        <div className='flex justify-center' onClick={() => setSlowTransitionOpened(true)}>
          <SecondaryButton title={t('addProgram')} />
        </div>

        <div className='flex flex-col gap-5'>
          <div className={`${styles.head} flex justify-evenly`} style={{ color: 'var(--primary)', borderBottom: '1px solid var(--primary)' }}>
            <div style={{ width: '20vw', textAlign: 'center' }}>{t('programName')}</div>
            <div style={{ width: '20vw', textAlign: 'center' }}>{t('programLink')}</div>
            <div style={{ width: '40vw', textAlign: 'center' }}>{t('description')}</div>
            <div style={{ width: '5vw', textAlign: 'center' }}></div>
          </div>
          {programs.map(({ uuid, title, description, url }, index) => {
            return <div key={index} className={`${styles.row} flex gap-5 justify-evenly py-3`} style={programs.length - 1 === index ? {} : { borderBottom: '1px solid #999' }}>
              <div style={{ width: '20vw', textAlign: 'center' }}>{title}</div>
              <div style={{ width: '20vw', textAlign: 'center', marginInline: '10px' }}>{url}</div>
              <div style={{ width: '40vw', textAlign: 'justify' }}>{description}</div>
              <IconTrash stroke={2} color='var(--primary)' style={{ cursor: 'pointer' }} onClick={() => handleDelete(uuid)} />
            </div>
          })}
        </div>


      </div>

      <ModalAddProgram slowTransitionOpened={slowTransitionOpened} setSlowTransitionOpened={setSlowTransitionOpened} />
    </>
  )
}
