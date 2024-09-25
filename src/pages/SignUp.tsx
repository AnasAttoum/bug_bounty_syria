import { Divider, Tabs } from '@mantine/core';
import styles from '../styles/signUp.module.css';
import SignUpCompany from '../components/signUp/SignUpCompany';
import SignUpSecurityResearcher from '../components/signUp/SignUpSecurityResearcher';
import { Link } from 'react-router-dom';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../lib/store';
import { useNavigate } from "react-router-dom"
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export default function SignUp() {

    const { isLogged } = useSelector((state: RootState) => state.reducers.user)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { ref: signUp, inView: signUpInView, entry: signUpEntry } = useInView()

    useEffect(() => {
        if (isLogged)
            navigate('/')
    }, [isLogged, navigate])

    useEffect(() => {
        if (signUpInView)
            signUpEntry?.target.classList.add('toBottomAnimation')
    }, [signUpInView, signUpEntry])

    return (
        <div className='flex justify-center  my-10' style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat' }}>

            <div className={`${styles.form} flex flex-col justify-evenly p-3 rounded-lg opacity-0 bg-white`} style={{ width: '50vw', marginTop: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} ref={signUp}>
                <div className='text-2xl font-bold'>{t('welcome')}</div>
                <div className='text-gray-500 font-bold mt-1 mb-2'>{t('continue')}</div>

                <Tabs variant="unstyled" defaultValue="SecurityResearcher" classNames={styles}>
                    <Tabs.List grow>
                        <Tabs.Tab
                            value="company"
                        >
                            {t('registerCompany')}
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="SecurityResearcher"
                        >
                            {t('registerSR')}
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="company" pt="xs">
                        <SignUpCompany />
                    </Tabs.Panel>

                    <Tabs.Panel value="SecurityResearcher" pt="xs">
                        <SignUpSecurityResearcher />
                    </Tabs.Panel>
                </Tabs>

                <Divider my="xs" label={<span style={{ color: 'black', fontWeight: '900' }}>{t('or')}</span>} labelPosition="center" color='black' />

                <div className='flex justify-center'>
                    <Link to={'/login'}>
                        <SecondaryButton title={t('logIn')} />
                    </Link>
                </div>

            </div>

        </div>
    )
}
