import { Input, Modal, Textarea } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../buttons/PrimaryButton';
import { validateAddProgram } from '../../validations/validations';
import { IconScreenshot, IconWorld } from '@tabler/icons-react';

export default function ModalAddProgram({ slowTransitionOpened, setSlowTransitionOpened }: { slowTransitionOpened: boolean, setSlowTransitionOpened: Dispatch<SetStateAction<boolean>> }) {

    const { t } = useTranslation()
    const [data, setData] = useState({
        name: '',
        link: '',
        description: '',
    })
    const [warning, setWarning] = useState({
        name: '',
        link: '',
        description: '',
    })

    useEffect(() => {
        if (slowTransitionOpened) {
            setData({
                name: '',
                link: '',
                description: '',
            })
            setWarning({
                name: '',
                link: '',
                description: '',
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
                name: '',
                link: '',
                description: '',
            })
            await validateAddProgram.validate(data, { abortEarly: false })
            console.log(data)
            setSlowTransitionOpened(false)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            setWarning({
                name: '',
                link: '',
                description: '',
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
                title={t('addProgram')}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{ transition: 'rotate-left' }}
            >
                <div className='flex flex-col gap-5'>
                    <Input.Wrapper error={warning.name}>
                        <Input placeholder={t('enterDomain')} rightSection={<IconScreenshot stroke={2} />} value={data.name} name='name' onChange={handleChange} />
                    </Input.Wrapper>

                    <Input.Wrapper error={warning.link}>
                        <Input placeholder={t('enterCompanyName')} rightSection={<IconWorld stroke={2} />} value={data.link} name='link' onChange={handleChange} />
                    </Input.Wrapper>

                    <Input.Wrapper error={warning.link}>
                        <Textarea
                            placeholder={t('enterDescription')}
                            style={{ width: '100%' }}
                            name='description'
                            value={data.description}
                            onChange={handleChange}
                        />
                    </Input.Wrapper>

                    <div className="flex justify-center my-5">
                        <div onClick={handleSave}>
                            <PrimaryButton title={t('saveChanges')} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}