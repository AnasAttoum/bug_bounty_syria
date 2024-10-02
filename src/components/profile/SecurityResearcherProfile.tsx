import { ActionIcon, Input, Textarea } from "@mantine/core";
import { IconCode, IconEdit, IconLogout, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import styles from '../../styles/profile.module.css'
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { validateSecurityResearcherSchema } from "../../validations/validations";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import ModalChangePassword from "../Modal/ModalChangePassword";
import ModalLogOut from "../Modal/ModalLogOut";

export default function SecurityResearcherProfile() {

    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        code: '',
    });
    const [image, setImage] = useState('')
    const [warning, setWarning] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        code: '',
    });

    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [slowTransitionOpenedLogOut, setSlowTransitionOpenedLogOut] = useState(false);
    const { t } = useTranslation()

    const { user } = useSelector((state: RootState) => state.reducers.user)
    const { name, email, phone, password, code } = user

    useEffect(() => {
        setImage('/Me.jpg')
        setData({
            name: name,
            email: email,
            phone: phone,
            password: password,
            code: code,
        })
    }, [name, email, phone, password, code])

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
                name: '',
                email: '',
                phone: '',
                password: '',
                code: '',
            })
            await validateSecurityResearcherSchema.validate(data, { abortEarly: false })
            console.log(data)
            console.log(image)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            setWarning({
                name: '',
                email: '',
                phone: '',
                password: '',
                code: '',
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
                        <Input.Wrapper error={warning.name} className={styles.input}>
                            <Input placeholder={t('enterFullName')} rightSection={<IconUser size={16} />} name='name' value={data.name} onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.email} className={styles.input}>
                            <Input placeholder={t('enterEmail')} rightSection={<IconMail size={16} />} name='email' value={data.email} onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.phone} className={styles.input}>
                            <Input placeholder={t('enterPhone')} rightSection={<IconPhone size={16} />} name='phone' value={data.phone} onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.code} className={styles.input}>
                            <Input placeholder={t('enterCode')} rightSection={<IconCode size={16} />} name='code' value={data.code} onChange={handleChange} />
                        </Input.Wrapper>

                        <Textarea
                            placeholder={t('enterDescription')}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="flex justify-center my-5" onClick={() => setSlowTransitionOpened(true)}>
                        <SecondaryButton title={t('changePassword')} />
                    </div>

                    <div className="flex justify-center my-5">
                        <div onClick={handleSave}>
                            <PrimaryButton title={t('saveChanges')} />
                        </div>
                    </div>


                </div>

            </div>

            <ModalChangePassword slowTransitionOpened={slowTransitionOpened} setSlowTransitionOpened={setSlowTransitionOpened} />
            <ModalLogOut slowTransitionOpenedLogOut={slowTransitionOpenedLogOut} setSlowTransitionOpenedLogOut={setSlowTransitionOpenedLogOut} />
        </>
    )
}
