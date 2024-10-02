import { Input, Modal, PasswordInput } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../buttons/PrimaryButton';
import { validateChangePassword } from '../../validations/validations';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { updateCompanyPassword } from '../../lib/slices/userSlice';
import LoadingComp from '../LoadingComp';

export default function ModalChangePassword({ slowTransitionOpened, setSlowTransitionOpened }: { slowTransitionOpened: boolean, setSlowTransitionOpened: Dispatch<SetStateAction<boolean>> }) {

    const { t } = useTranslation()
    const { loadingCompanyPassword } = useSelector((state: RootState) => state.reducers.user)

    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [warning, setWarning] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })


    const dispatch = useDispatch<AppDispatch>()
    const [error, setError] = useState('')

    useEffect(() => {
        if (slowTransitionOpened) {
            setData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
            setWarning({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        }
    }, [slowTransitionOpened])

    const handleChange = (e: { target: { value: string; name: string; }; }) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {
            setWarning({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
            await validateChangePassword.validate(data, { abortEarly: false })

            const formData = new FormData()
            formData.append('old_password', data.currentPassword)
            formData.append('new_password', data.newPassword)
            formData.append('new_password_confirmation', data.confirmPassword)

            dispatch(updateCompanyPassword(formData)).unwrap().then(result => {
                if (typeof result === 'string')
                    setError(result)
                else {
                    setError('')
                    setSlowTransitionOpened(false)
                }
            })

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            setWarning({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
            error.inner.forEach((err: { path: string, message: string }) => {
                setWarning(prev => ({ ...prev, [err.path]: t(err.message) }))
            })
        }
    }

    return (
        <>
            <Modal
                opened={slowTransitionOpened}
                onClose={() => setSlowTransitionOpened(false)}
                title={t('changePassword')}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{ transition: 'rotate-left' }}
            >
                <div className='flex flex-col gap-5'>
                    <Input.Wrapper error={warning.currentPassword}>
                        <PasswordInput placeholder={t('enterCurrPassword')} value={data.currentPassword} name='currentPassword' onChange={handleChange} />
                    </Input.Wrapper>
                    <Input.Wrapper error={warning.newPassword}>
                        <PasswordInput placeholder={t('enterNewPassword')} value={data.newPassword} name='newPassword' onChange={handleChange} />
                    </Input.Wrapper>
                    <Input.Wrapper error={warning.confirmPassword}>
                        <PasswordInput placeholder={t('enterConfirmPassword')} value={data.confirmPassword} name='confirmPassword' onChange={handleChange} />
                    </Input.Wrapper>

                    <div className='text-center text-red-500 text-xs'>{error}</div>

                    <div className="flex justify-center my-5">
                        <div onClick={handleSave}>
                            <PrimaryButton title={t('saveChanges')} />
                        </div>
                    </div>

                    {loadingCompanyPassword === 'pending' && <div className="my-7"><LoadingComp /></div>}
                    
                </div>
            </Modal>
        </>
    );
}