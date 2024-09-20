import { useRef, useState } from 'react';
import { Input, PasswordInput } from '@mantine/core';
import { IconUser, IconPhone, IconMail, IconCode } from '@tabler/icons-react';

import { Checkbox } from '@mantine/core';

import styles from '../../styles/signUp.module.css'
import PrimaryButton from '../buttons/PrimaryButton';

export default function SignUpSecurityResearcher() {

  const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    code: '',
  });
  const [warning, setWarning] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    code: '',
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

    if (data.name === '')
      setWarning(prev => ({ ...prev, name: 'اسم الشركة خاطئ' }))
    else
      setWarning(prev => ({ ...prev, name: '' }))

    if (data.email === '' || !regEmail.test(data.email))
      setWarning(prev => ({ ...prev, email: 'البريد الإلكتروني خاطئ' }))
    else
      setWarning(prev => ({ ...prev, email: '' }))

    if (data.phone === '' || isNaN(parseInt(data.phone)) || data.phone.length <= 9)
      setWarning(prev => ({ ...prev, phone: 'الرقم خاطئ' }))
    else
      setWarning(prev => ({ ...prev, phone: '' }))

    if (data.password.length < 6)
      setWarning(prev => ({ ...prev, password: 'كلمة السر يجب أن تكون أكثر من 5 محارف' }))
    else
      setWarning(prev => ({ ...prev, password: '' }))

    if (data.code === '')
      setWarning(prev => ({ ...prev, code: 'إدخال خاطئ' }))
    else
      setWarning(prev => ({ ...prev, code: '' }))

    if (data.name !== '' && data.email !== '' && regEmail.test(data.email) && data.phone !== '' && isNaN(parseInt(data.phone)) && data.phone.length > 9 && data.password.length >= 6 && data.code !== '' && terms.current === true) {
      console.log(data)

      setWarning({
        name: '',
        email: '',
        phone: '',
        password: '',
        code: '',
        terms: ''
      })
    }
  }

  return (
    <div className='flex flex-col justify-around gap-5'>

      <div className='flex flex-wrap justify-start px-2 gap-y-5 gap-x-3'>
        <Input.Wrapper error={warning.name} className={styles.input}>
          <Input placeholder="أدخل اسمك الكامل" rightSection={<IconUser size={16} />} name='name' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.email} className={styles.input}>
          <Input placeholder="أدخل البريد الإلكتروني" rightSection={<IconMail size={16} />} name='email' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.phone} className={styles.input}>
          <Input placeholder="أدخل رقم الهاتف" rightSection={<IconPhone size={16} />} name='phone' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.password} className={styles.input}>
          <PasswordInput placeholder="أدخل كلمة المرور" name='password' onChange={handleChange} />
        </Input.Wrapper>

        <Input.Wrapper error={warning.code} className={styles.input}>
          <Input placeholder="أدخل كود التسجيل" rightSection={<IconCode size={16} />} name='code' onChange={handleChange} />
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
