import { Link, useNavigate } from 'react-router-dom';
import { Divider, Input, PasswordInput } from '@mantine/core';

import styles from '../styles/signUp.module.css'
import SecondaryButton from '../components/buttons/SecondaryButton';
import { useEffect, useState } from 'react';
import { IconMail } from '@tabler/icons-react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../lib/slices/userSlice';
import { RootState } from '../lib/store';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { validateLogInSchema } from '../validations/validations';

export default function LogIn() {

    const {isLogged}=useSelector((state:RootState)=>state.reducers.user)
    const navigate = useNavigate()
    const {ref:logIn , inView:logInInView , entry:logInEntry} = useInView()
    const { t } = useTranslation()

    useEffect(()=>{
        if(isLogged)
            navigate('/')
    },[isLogged,navigate])

    useEffect(()=>{
        if(logInInView)
            logInEntry?.target.classList.add('toBottomAnimation')
    },[logInInView,logInEntry])

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

    const handleSignIn = async() => {
        try {
            await validateLogInSchema.validate(data, { abortEarly: false })
            console.log(data)
            setWarning({
                email: '',
                password: '',
            })
            dispatch(login())
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          catch (error: any) {
            setWarning({
                email: '',
                password: '',
            })
            error.inner.forEach(({ message, path }: { message: string, path: string }) => {
              setWarning(prev => ({ ...prev, [path]: t(message) }))
            })

        }
    }

    return (
        <div className='flex justify-center items-center py-10' style={{ backgroundImage: 'url(/background.svg)',backgroundRepeat:'no-repeat',minHeight:'calc(100vh - 200px)' }}>

            <div className={`${styles.logIn} flex flex-col justify-center gap-7 h-fit p-3 bg-white rounded-lg opacity-0`} style={{ width: '40vw', marginTop: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} ref={logIn}>
                <div>
                    <div className='text-2xl font-bold'>{t('welcome')}</div>
                    <div className='text-gray-500 font-bold mt-1 mb-2'>{t('continue')}</div>
                </div>

                <div className='flex flex-col justify-around gap-5'>

                    <div className='flex flex-col flex-wrap justify-start px-2 gap-y-5 gap-x-3'>
                        <Input.Wrapper error={warning.email} style={{width:'100%'}}>
                            <Input placeholder={t('enterEmail')} rightSection={<IconMail size={16} />} name='email' onChange={handleChange} />
                        </Input.Wrapper>
                        <Input.Wrapper error={warning.password} style={{width:'100%'}}>
                            <PasswordInput placeholder={t('enterPassword')} name='password' onChange={handleChange} />
                        </Input.Wrapper>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div onClick={handleSignIn}>
                        <PrimaryButton title={t('logIn')} />
                    </div>
                </div>


                <Divider my="xs" label={<span style={{ color: 'black', fontWeight: '900' }}>أو</span>} labelPosition="center" color='black' />

                <div className='flex justify-center'>
                    <Link to={'/signup'}>
                        <SecondaryButton title={t('signUp')} />
                    </Link>
                </div>

            </div>

        </div>
    )
}
