import { Divider, Tabs } from '@mantine/core';
import classes from '../styles/signUp.module.css';
import SignUpCompany from '../components/signUp/SignUpCompany';
import SignUpSecurityResearcher from '../components/signUp/SignUpSecurityResearcher';
import { Link } from 'react-router-dom';
import SecondaryButton from '../components/buttons/SecondaryButton';

export default function SignUp() {
    return (
        <div className='flex justify-evenly my-10'>

            <div className={`${classes.form} flex flex-col justify-evenly p-3 rounded-lg`} style={{ width: '50vw', marginTop: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} >
                <div className='text-2xl font-bold'>مرحباً بك في Bug Bounty</div>
                <div className='text-gray-500 font-bold mt-1 mb-2'>يرجى التسجيل للمتابعة</div>

                <Tabs variant="unstyled" defaultValue="SecurityResearcher" classNames={classes}>
                    <Tabs.List grow>
                        <Tabs.Tab
                            value="company"
                        >
                            التسجيل كشركة جديدة
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="SecurityResearcher"
                        >
                            التسجيل كباحث أمني
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="company" pt="xs">
                        <SignUpCompany />
                    </Tabs.Panel>

                    <Tabs.Panel value="SecurityResearcher" pt="xs">
                        <SignUpSecurityResearcher />
                    </Tabs.Panel>
                </Tabs>

                <Divider my="xs" label={<span style={{ color: 'black', fontWeight: '900' }}>أو</span>} labelPosition="center" color='black' />

                <div className='flex justify-center'>
                    <Link to={'/login'}>
                        <SecondaryButton title='تسجيل الدخول' />
                    </Link>
                </div>

            </div>

            <img src="/images/intro.png" alt="Intro Image" className={classes.img} style={{ height: '80vh' }} />
        </div>
    )
}
