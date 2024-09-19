// import { useState } from 'react';
import { Divider, Input, PasswordInput } from '@mantine/core';
import { IconUser, IconPhone, IconMail, IconCode } from '@tabler/icons-react';

import { Checkbox } from '@mantine/core';

import styles from '../../styles/signUp.module.css'
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

export default function SignUpSecurityResearcher() {

  // const [value, setValue] = useState('Clear me');

  return (
    <div className='flex flex-col justify-around gap-5'>

      <div className='flex flex-wrap justify-start px-2 gap-y-5 gap-x-3'>
        <Input placeholder="أدخل اسمك الكامل" rightSection={<IconUser size={16} />} className={styles.input} />
        <Input placeholder="أدخل البريد الإلكتروني" rightSection={<IconMail size={16} />} className={styles.input} />
        <Input placeholder="أدخل رقم الهاتف" rightSection={<IconPhone size={16} />} className={styles.input} />
        <PasswordInput placeholder="أدخل كلمة المرور" className={styles.input} />
        <Input placeholder="أدخل كود التسجيل" rightSection={<IconCode size={16} />} className={styles.input} />
      </div>

      <Checkbox
        defaultChecked
        label=" الموافقة على سياسة الخصوصية وشروط الخدمة."
        color='var(--primary)'
      />

      <div className='flex justify-center'>
        <PrimaryButton title='إنشاء حساب' />
      </div>

      <Divider my="xs" label={<span style={{ color: 'black', fontWeight: '900' }}>أو</span>} labelPosition="center" color='black' />

      <div className='flex justify-center'>
        <SecondaryButton title='تسجيل الدخول' />
      </div>

    </div>
  )
}
