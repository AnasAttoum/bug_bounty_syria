import { ActionIcon, Avatar, Input, NativeSelect, Textarea } from "@mantine/core";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { showCompany, updateCompanyProfile } from "../../lib/slices/userSlice";
import LoadingComp from "../LoadingComp";

export default function CompanyProfile() {

    const { user, loadingCompanyProfile } = useSelector((state: RootState) => state.reducers.user)

    const [data, setData] = useState({
        domain: '',
        name: '',
        type: '',
        employeesNumber: '',
        email: '',
        description: ''
    });
    const [image, setImage] = useState('')
    const [file, setFile] = useState<File | undefined>(undefined)
    const [warning, setWarning] = useState({
        domain: '',
        name: '',
        type: '',
        employeesNumber: '',
        email: '',
    });
    const [error, setError] = useState('')

    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [slowTransitionOpenedLogOut, setSlowTransitionOpenedLogOut] = useState(false);
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        const x = user.image === '' ? 'null' : user.image
        setImage('https://api.bug-bounty.darrebni.net/storage/app/public/' + x)

        setData({
            domain: user.domain,
            name: user.name,
            type: user.type,
            employeesNumber: user.people,
            email: user.email as string,
            description: user.description || ''
        })

    }, [user])

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
                domain: '',
                name: '',
                type: '',
                employeesNumber: '',
                email: '',
            })
            await validateCompanySchema.validate(data, { abortEarly: false })

            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('employess_count', data.employeesNumber)
            formData.append('type', data.type)
            formData.append('email', data.email)
            formData.append('description', data.description)
            formData.append('logo', file as File)
            formData.append('domain', data.domain)

            dispatch(updateCompanyProfile(formData)).unwrap().then(result => {
                if (typeof result === 'string')
                    setError(result)
                else {
                    dispatch(showCompany())
                    setError('')
                }
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            setWarning({
                domain: '',
                name: '',
                type: '',
                employeesNumber: '',
                email: '',
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
                        <Input.Wrapper error={warning.domain} className={styles.input}>
                            <Input placeholder={t('enterDomain')} rightSection={<IconWorld size={16} />} value={data.domain} name='domain' onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.name} className={styles.input}>
                            <Input placeholder={t('enterCompanyName')} rightSection={<IconUser size={16} />} value={data.name} name='name' onChange={handleChange} />
                        </Input.Wrapper>

                        <Input.Wrapper error={warning.type} className={styles.input}>
                            <NativeSelect data={[{ label: t('governmentCompany'), value: 'حكومية' }, { label: t('privateCompany'), value: 'خاصة' }]} value={data.type} name='type' onChange={handleChange} />
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
                            value={data.description}
                            name='description' onChange={handleChange}
                        />
                    </div>

                    <div className='text-center text-red-500 text-xs'>{error}</div>

                    <div className="flex justify-center my-5" onClick={() => setSlowTransitionOpened(true)}>
                        <SecondaryButton title={t('changePassword')} />
                    </div>

                    <div className="flex justify-center gap-5 my-5">
                        <div onClick={handleSave}>
                            <PrimaryButton title={t('saveChanges')} />
                        </div>
                        <Link to={'/programs'}>
                            <div>
                                <SecondaryButton title={t('addRemoveProgram')} />
                            </div>
                        </Link>
                    </div>

                    <div className="my-7">
                        {loadingCompanyProfile === 'pending' && <LoadingComp />}
                    </div>


                </div>

            </div>

            <ModalChangePassword slowTransitionOpened={slowTransitionOpened} setSlowTransitionOpened={setSlowTransitionOpened} />
            <ModalLogOut slowTransitionOpenedLogOut={slowTransitionOpenedLogOut} setSlowTransitionOpenedLogOut={setSlowTransitionOpenedLogOut} />
        </>
    )
}
