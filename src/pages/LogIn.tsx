import { Link, useNavigate } from 'react-router-dom';
import { Divider, Input, PasswordInput } from '@mantine/core';

import styles from '../styles/signUp.module.css';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { useEffect, useState } from 'react';
import { IconMail } from '@tabler/icons-react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../lib/slices/userSlice';
import { RootState } from '../lib/store';

export default function LogIn() {

    const {isLogged}=useSelector((state:RootState)=>state.reducers.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(isLogged)
            navigate('/')
    },[isLogged,navigate])

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [warning, setWarning] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch()

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSignIn = () => {
        if (data.email === '' || !regEmail.test(data.email))
            setWarning(prev => ({ ...prev, email: 'البريد الإلكتروني غير صالح' }))
        else
            setWarning(prev => ({ ...prev, email: '' }))

        if (data.password === '')
            setWarning(prev => ({ ...prev, password: 'يرجى التأكد من كلمة السر' }))
        else
            setWarning(prev => ({ ...prev, password: '' }))

        if (data.email !== '' && regEmail.test(data.email) && data.password !== '') {
            console.log(data)

            setWarning({
                email: '',
                password: '',
            })

            dispatch(login())
        }
    }

    return (
        <div className='flex justify-evenly my-10'>

            <div className={`${styles.form} flex flex-col justify-center gap-7 p-3 rounded-lg`} style={{ width: '50vw', marginTop: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} >
                <div>
                    <div className='text-2xl font-bold'>مرحباً بك في Bug Bounty</div>
                    <div className='text-gray-500 font-bold mt-1 mb-2'>يرجى التسجيل للمتابعة</div>
                </div>

                <div className='flex flex-col justify-around gap-5'>

                    <div className='flex flex-wrap justify-start px-2 gap-y-5 gap-x-3'>
                        <Input.Wrapper error={warning.email} className={styles.input}>
                            <Input placeholder="أدخل البريد الإلكتروني" rightSection={<IconMail size={16} />} name='email' onChange={handleChange} />
                        </Input.Wrapper>
                        <Input.Wrapper error={warning.password} className={styles.input}>
                            <PasswordInput placeholder="أدخل كلمة المرور" name='password' onChange={handleChange} />
                        </Input.Wrapper>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div onClick={handleSignIn}>
                        <PrimaryButton title='تسجيل الدخول' />
                    </div>
                </div>


                <Divider my="xs" label={<span style={{ color: 'black', fontWeight: '900' }}>أو</span>} labelPosition="center" color='black' />

                <div className='flex justify-center'>
                    <Link to={'/signup'}>
                        <SecondaryButton title='إنشاء حساب جديد' />
                    </Link>
                </div>

            </div>

            <img src="/images/intro.png" alt="Intro Image" className={styles.img} style={{ height: '80vh' }} />
        </div>
    )
}
