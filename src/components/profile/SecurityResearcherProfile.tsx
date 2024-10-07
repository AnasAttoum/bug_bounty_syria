import { ActionIcon, Avatar, Input, Textarea } from "@mantine/core";
import { IconEdit, IconLogout, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import styles from '../../styles/profile.module.css'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { validateSecurityResearcherEditProfileSchema } from "../../validations/validations";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import ModalChangePassword from "../Modal/ModalChangePassword";
import ModalLogOut from "../Modal/ModalLogOut";
import LoadingComp from "../LoadingComp";
import { updateSRProfile } from "../../lib/slices/userSlice";

export default function SecurityResearcherProfile() {

    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });
    const [image, setImage] = useState('')
    const [file, setFile] = useState<File | undefined>(undefined)
    const [warning, setWarning] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [slowTransitionOpenedLogOut, setSlowTransitionOpenedLogOut] = useState(false);
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    const [error, setError] = useState('')

    const { userSR,loadingSRProfile } = useSelector((state: RootState) => state.reducers.user)
    const { name, email, phone, image: img, description } = userSR

    useEffect(() => {
        const x = img === '' ? 'null' : img
        setImage(import.meta.env.VITE_IMAGE_URL + x)
        setData({
            name: name,
            email: email,
            phone: phone,
            description: description || ''
        })
    }, [name, email, phone, img, description])

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFile(file)

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
            })
            await validateSecurityResearcherEditProfileSchema.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('description', data.description)
            formData.append('code', userSR.code)
            formData.append('image', file as File)
            formData.append('phone', userSR.phone)
            formData.append('facebook', '')
            formData.append('linkedin', '')
            formData.append('github', '')

            dispatch(updateSRProfile(formData)).unwrap().then(result => {
                if (typeof result === 'string')
                    setError(result)
                else
                    setError('')
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            setWarning({
                name: '',
                email: '',
                phone: '',
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
                        {image.endsWith('null') ?
                            <Avatar color="red" radius="xl" name={data.name} style={{ width: '100px', height: '100px', borderRadius: '50%', outline: '2px solid var(--primary)', outlineOffset: '3px', cursor: 'pointer' }} />
                            :
                            <img src={image} alt="Profile Image" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        }
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

                        <Textarea
                            placeholder={t('enterDescription')}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className='text-center text-red-500 text-xs'>{error}</div>

                    <div className="flex justify-center my-5" onClick={() => setSlowTransitionOpened(true)}>
                        <SecondaryButton title={t('changePassword')} />
                    </div>

                    <div className="flex justify-center my-5">
                        <div onClick={handleSave}>
                            <PrimaryButton title={t('saveChanges')} />
                        </div>
                    </div>

                    <div className="my-7">
                        {loadingSRProfile === 'pending' && <LoadingComp />}
                    </div>


                </div>

            </div>

            <ModalChangePassword slowTransitionOpened={slowTransitionOpened} setSlowTransitionOpened={setSlowTransitionOpened} />
            <ModalLogOut slowTransitionOpenedLogOut={slowTransitionOpenedLogOut} setSlowTransitionOpenedLogOut={setSlowTransitionOpenedLogOut} />
        </>
    )
}
