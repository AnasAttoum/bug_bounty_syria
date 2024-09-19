import { Tabs } from '@mantine/core';
import classes from '../styles/signUp.module.css';
import SignUpCompany from '../components/signUp/SignUpCompany';
import SignUpSecurityResearcher from '../components/signUp/SignUpSecurityResearcher';

export default function SignUp() {
    return (
        <div className='flex justify-evenly mt-5'>

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

            </div>

            <img src="/images/intro.png" alt="Intro Image" className={classes.img} style={{ height: '80vh' }} />
        </div>
    )
}
