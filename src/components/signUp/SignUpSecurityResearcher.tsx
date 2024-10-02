import { useRef, useState } from 'react';
import { Input, PasswordInput } from '@mantine/core';
import { IconUser, IconPhone, IconMail } from '@tabler/icons-react';

import { Checkbox } from '@mantine/core';

import styles from '../../styles/signUp.module.css'
import PrimaryButton from '../buttons/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { validateSecurityResearcherSchema } from '../../validations/validations';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { registerSR } from '../../lib/slices/userSlice';
import LoadingComp from '../LoadingComp';
import { AppDispatch, RootState } from '../../lib/store';

export default function SignUpSecurityResearcher() {

  const [data, setData] = useState({
    signUpType: 1,
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [warning, setWarning] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    terms: ''
  });

  const terms = useRef<boolean>(true)
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { loadingSR } = useSelector((state: RootState) => state.reducers.user)
  const [error, setError] = useState('')
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
        await validateSecurityResearcherSchema.validate(data, { abortEarly: false })

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('password', data.password)

        dispatch(registerSR(formData)).then(unwrapResult).then(result => {
          if (typeof result !== 'string')
            navigate(`/code/${result.data.data.researcher.uuid}`)
          else {
            setError(result)
          }
        })

        setWarning({
          name: '',
          email: '',
          phone: '',
          password: '',
          terms: ''
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        setWarning({
          name: '',
          email: '',
          phone: '',
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
        <Input.Wrapper error={warning.name} className={styles.input}>
          <Input placeholder={t('enterFullName')} rightSection={<IconUser size={16} />} name='name' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.email} className={styles.input}>
          <Input placeholder={t('enterEmail')} rightSection={<IconMail size={16} />} name='email' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.phone} className={styles.input}>
          <Input placeholder={t('enterPhone')} rightSection={<IconPhone size={16} />} name='phone' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.password} className={styles.input}>
          <PasswordInput placeholder={t('enterPassword')} name='password' onChange={handleChange} />
        </Input.Wrapper>

        {/* <Input.Wrapper error={warning.code} className={styles.input}>
          <Input placeholder={t('enterCode')} rightSection={<IconCode size={16} />} name='code' onChange={handleChange} />
        </Input.Wrapper> */}
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
        {loadingSR === 'pending' && <LoadingComp />}
      </div>

    </div>
  )
}
