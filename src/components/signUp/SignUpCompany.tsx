import { useRef, useState } from 'react';
import { Input, NativeSelect, PasswordInput } from '@mantine/core';
import { IconWorld, IconUser, IconUsers, IconMail } from '@tabler/icons-react';

import { Checkbox } from '@mantine/core';

import styles from '../../styles/signUp.module.css'
import PrimaryButton from '../buttons/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { validateCompanySchema } from '../../validations/validations';
import { registerCompany } from '../../lib/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import LoadingComp from '../LoadingComp';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export default function SignUpCompany() {

  const [data, setData] = useState({
    signUpType: 0,
    domain: '',
    name: '',
    type: 'حكومية',
    employeesNumber: '0',
    email: '',
    password: '',
  });
  const [warning, setWarning] = useState({
    domain: '',
    name: '',
    type: '',
    employeesNumber: '',
    email: '',
    password: '',
    terms: ''
  });
  const dispatch = useDispatch<AppDispatch>()
  const [error,setError]=useState('')
  const { loadingCompany } = useSelector((state: RootState) => state.reducers.user)

  const terms = useRef<boolean>(true)
  const { t } = useTranslation()
  const navigate = useNavigate()


  const handleChange = (e: { target: { value: string; name: string; }; }) => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreate = async () => {
    if (terms.current === false)
      setWarning(prev => ({ ...prev, terms: t('invalidTerms') }))
    else {
      setWarning(prev => ({ ...prev, terms: '' }))

      try {
        await validateCompanySchema.validate({ ...data, emplyeesNumber: parseInt(data.employeesNumber) }, { abortEarly: false })

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('employess_count', data.employeesNumber)
        formData.append('type', data.type)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('domain', data.domain)

        dispatch(registerCompany(formData)).then(unwrapResult).then(result => {
          if (typeof result !== 'string')
            navigate('/login')
          else{
            setError(result)
          }
        })

        setWarning({
          domain: '',
          name: '',
          type: '',
          employeesNumber: '',
          email: '',
          password: '',
          terms: ''
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        setWarning({
          domain: '',
          name: '',
          type: '',
          employeesNumber: '',
          email: '',
          password: '',
          terms: ''
        })
        error.inner.forEach(({ message, path }: { message: string, path: string }) => {
          setWarning(prev => ({ ...prev, [path]: t(message) }))
        })
      }
    }
  }

  return (
    <div className='flex flex-col justify-around gap-5'>

      <div className='flex flex-wrap justify-start px-2 gap-y-5 gap-x-3'>
        <Input.Wrapper error={warning.domain} className={styles.input}>
          <Input placeholder={t('enterDomain')} rightSection={<IconWorld size={16} />} name='domain' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.name} className={styles.input}>
          <Input placeholder={t('enterCompanyName')} rightSection={<IconUser size={16} />} name='name' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.type} className={styles.input}>
          <NativeSelect data={[{ label: t('governmentCompany'), value: 'حكومية' }, { label: t('privateCompany'), value: 'خاصة' }]} name='type' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.employeesNumber} className={styles.input}>
          <Input placeholder={t('enterEmployeeNum')} rightSection={<IconUsers size={16} />} name='employeesNumber' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.email} className={styles.input}>
          <Input placeholder={t('enterEmail')} rightSection={<IconMail size={16} />} name='email' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.password} className={styles.input}>
          <PasswordInput placeholder={t('enterPassword')} name='password' onChange={handleChange} />
        </Input.Wrapper>
      </div>

      <Checkbox
        defaultChecked
        label={t('terms')}
        color='var(--primary)'
        onChange={(e) => { terms.current = e.currentTarget.checked }}
      />

      <div className='text-red-500 text-xs'>{warning.terms}</div>
      <div className='text-center text-red-500 text-xs'>{error}</div>

      <div className='flex flex-col items-center gap-7 mb-5'>
        <div onClick={handleCreate}>
          <PrimaryButton title={t('signUp')} />
        </div>
        {loadingCompany === 'pending' && <LoadingComp />}
      </div>

    </div>
  )
}
