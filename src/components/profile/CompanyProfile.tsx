import { ActionIcon, Input, NativeSelect, Textarea } from "@mantine/core";
import { IconEdit, IconLogout, IconMail, IconUser, IconUsers, IconWorld } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import styles from '../../styles/profile.module.css'
import { useTranslation } from "react-i18next";
import { validateCompanySchema } from "../../validations/validations";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import ModalChangePassword from "../Modal/ModalChangePassword";
import ModalLogOut from "../Modal/ModalLogOut";
import { Link } from "react-router-dom";

export default function CompanyProfile() {

    const [data, setData] = useState({
        domain: '',
        name: '',
        type: 0,
        employeesNumber: 0,
        email: '',
        password: '',
    });
    const [image, setImage] = useState('')
    const [warning, setWarning] = useState({
        domain: '',
        name: '',
        type: '',
        employeesNumber: '',
        email: '',
        password: '',
    });

    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [slowTransitionOpenedLogOut, setSlowTransitionOpenedLogOut] = useState(false);
    const { t } = useTranslation()

    const { image:profileImage, domain, name, type, employeesNumber, email, password } = { image: '/Me.jpg', domain: 'www.darrebni.com', name: 'دربني', type: 0, employeesNumber: 5, email: 'info@darrebni.com', password: '1234567' }

    useEffect(() => {
        setImage(profileImage)
        setData({
            domain: domain,
            name: name,
            type: type,
            employeesNumber: employeesNumber,
            email: email,
            password: password,
        })
    }, [profileImage, domain, name, type, employeesNumber, email, password])

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        const reader = new FileReader()
        reader.readAsDataURL(file as Blob)
        reader.onload = () => {
            setImage(reader.result as string)
        }

    }

    const handleSave = async () => {
        try {
            setWarning({
                domain: '',
                name: '',
                type: '',
                employeesNumber: '',
                email: '',
                password: '',
            })
            await validateCompanySchema.validate(data, { abortEarly: false })
            console.log(data)
            console.log(image)
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
            })
            error.inner.forEach((err: { path: string, message: string }) => {
                setWarning(prev => ({ ...prev, [err.path]: t(err.message) }))
            })
        }
    }

    return (
        <>
            <div className="flex justify-center py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat' }}>

                <div style={{ width: '60vw' }}>

                    <div style={{ display: 'flex', justifyContent: 'right' }}><IconLogout stroke={2} color="var(--primary)" style={{ cursor: 'pointer' }} onClick={() => setSlowTransitionOpenedLogOut(true)} /></div>

                    <div className="flex justify-center">
                        <ActionIcon component="label" style={{ transform: 'translateX(-25px)', backgroundColor: 'var(--primary)', borderRadius: '50%', padding: '3px' }}>
                            <IconEdit stroke={1} color="white" />
                            <input type="file" accept="image/*" hidden onChange={handleImage} />
                        </ActionIcon>
                        <img src={image} alt="Profile Image" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>

                    <div className='flex flex-wrap justify-start px-2 gap-y-7 gap-x-3 my-10'>
                        <Input.Wrapper error={warning.domain} className={styles.input}>
                            <Input placeholder={t('enterDomain')} rightSection={<IconWorld size={16} />} value={data.domain} name='domain' onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.name} className={styles.input}>
                            <Input placeholder={t('enterCompanyName')} rightSection={<IconUser size={16} />} value={data.name} name='name' onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.type} className={styles.input}>
                            <NativeSelect data={[{ label: t('governmentCompany'), value: 'government' }, { label: t('privateCompany'), value: 'private' }]} value={data.type} name='type' onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.employeesNumber} className={styles.input}>
                            <Input placeholder={t('enterEmployeeNum')} rightSection={<IconUsers size={16} />} value={data.employeesNumber} name='employeesNumber' onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.email} className={styles.input}>
                            <Input placeholder={t('enterEmail')} rightSection={<IconMail size={16} />} value={data.email} name='email' onChange={handleChange} />
                        </Input.Wrapper>

                        <Textarea
                            placeholder={t('enterDescription')}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="flex justify-center my-5" onClick={() => setSlowTransitionOpened(true)}>
                        <SecondaryButton title={t('changePassword')} />
                    </div>

                    <div className="flex justify-center gap-5 my-5">
                        <div onClick={handleSave}>
                            <PrimaryButton title={t('saveChanges')} />
                        </div>
                        <Link to={'/programs'}>
                            <div onClick={handleSave}>
                                <SecondaryButton title={t('addRemoveProgram')} />
                            </div>
                        </Link>
                    </div>


                </div>

            </div>

            <ModalChangePassword slowTransitionOpened={slowTransitionOpened} setSlowTransitionOpened={setSlowTransitionOpened} />
            <ModalLogOut slowTransitionOpenedLogOut={slowTransitionOpenedLogOut} setSlowTransitionOpenedLogOut={setSlowTransitionOpenedLogOut} />
        </>
    )
}
