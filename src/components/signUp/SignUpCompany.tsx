import { useRef, useState } from 'react';
import { Input, NativeSelect, PasswordInput } from '@mantine/core';
import { IconWorld, IconUser, IconUsers, IconMail } from '@tabler/icons-react';

import { Checkbox } from '@mantine/core';

import styles from '../../styles/signUp.module.css'
import PrimaryButton from '../buttons/PrimaryButton';

export default function SignUpCompany() {
  const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [data, setData] = useState({
    signUpType: 0,
    domain: '',
    name: '',
    type: 'شركة حكومية',
    employeesNumber: '',
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

  const terms = useRef<boolean>(true)

  const handleChange = (e: { target: { value: string; name: string; }; }) => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreate = () => {
    if (terms.current === false)
      setWarning(prev => ({ ...prev, terms: 'الرجاء الموافقة على  سياسة الخصوصية وشروط الخدمة' }))
    else
      setWarning(prev => ({ ...prev, terms: '' }))

    if (data.domain === '')
      setWarning(prev => ({ ...prev, domain: 'دومين خاطئ' }))
    else
      setWarning(prev => ({ ...prev, domain: '' }))

    if (data.name === '')
      setWarning(prev => ({ ...prev, name: 'اسم الشركة خاطئ' }))
    else
      setWarning(prev => ({ ...prev, name: '' }))

    if (data.type === '')
      setWarning(prev => ({ ...prev, type: 'الرجاء اختيار نوع الشركة' }))
    else
      setWarning(prev => ({ ...prev, type: '' }))

    if (data.employeesNumber === '' || isNaN(parseInt(data.employeesNumber)))
      setWarning(prev => ({ ...prev, employeesNumber: 'إدخال خاطئ' }))
    else
      setWarning(prev => ({ ...prev, employeesNumber: '' }))

    if (data.email === '' || !regEmail.test(data.email))
      setWarning(prev => ({ ...prev, email: 'البريد الإلكتروني خاطئ' }))
    else
      setWarning(prev => ({ ...prev, email: '' }))

    if (data.password.length < 6)
      setWarning(prev => ({ ...prev, password: 'كلمة السر يجب أن تكون أكثر من 6 محارف' }))
    else
      setWarning(prev => ({ ...prev, password: '' }))

    if (data.domain !== '' && data.name !== '' && data.type !== '' && data.employeesNumber !== '' && !isNaN(parseInt(data.employeesNumber)) && data.email !== '' && regEmail.test(data.email) && data.password.length >= 6 && terms.current === true) {
      console.log(data)

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
  }

  return (
    <div className='flex flex-col justify-around gap-5'>

      <div className='flex flex-wrap justify-start px-2 gap-y-5 gap-x-3'>
        <Input.Wrapper error={warning.domain} className={styles.input}>
          <Input placeholder="أدخل دومين الشركة" rightSection={<IconWorld size={16} />} name='domain' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.name} className={styles.input}>
          <Input placeholder="أدخل اسم الشركة" rightSection={<IconUser size={16} />} name='name' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.type} className={styles.input}>
          <NativeSelect data={['شركة حكومية', 'شركة خاصة']} name='type' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.employeesNumber} className={styles.input}>
          <Input placeholder="أدخل عدد موظفين الشركة" rightSection={<IconUsers size={16} />} name='employeesNumber' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.email} className={styles.input}>
          <Input placeholder="أدخل البريد الإلكتروني للشركة" rightSection={<IconMail size={16} />} name='email' onChange={handleChange} />
        </Input.Wrapper>
        
        <Input.Wrapper error={warning.password} className={styles.input}>
          <PasswordInput placeholder="أدخل كلمة المرور" name='password' onChange={handleChange} />
        </Input.Wrapper>
      </div>

      <Checkbox
        defaultChecked
        label=" الموافقة على سياسة الخصوصية وشروط الخدمة."
        color='var(--primary)'
        onChange={(e) => { terms.current = e.currentTarget.checked }}
      />

      <div className='text-red-500 text-xs'>{warning.terms}</div>

      <div className='flex justify-center'>
        <div onClick={handleCreate}>
          <PrimaryButton title='إنشاء حساب' />
        </div>
      </div>

    </div>
  )
}
