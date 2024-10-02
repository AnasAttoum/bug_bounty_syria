import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, Rating } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

export default function ModalRating({ slowTransitionOpenedRating, setSlowTransitionOpenedRating }: { slowTransitionOpenedRating: boolean, setSlowTransitionOpenedRating: Dispatch<SetStateAction<boolean>> }) {

    const { t } = useTranslation()
    const [rate, setRate] = useState(0)
    const [warning, setWarning] = useState('')

    useEffect(()=>{
        setRate(0)
        setWarning('')
    },[])

    const handleRating = () => {
        if(rate===0)
            setWarning(t('invalidEntry'))
        else{
            console.log(rate)
        }
    }

    return (
        <>
            <Modal
                opened={slowTransitionOpenedRating}
                onClose={() => setSlowTransitionOpenedRating(false)}
                title={t('bugAssessment')}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{ transition: 'rotate-left' }}
            >
                <div className='text-sm text-gray-500'>{t('pleaseRating')}</div>

                <div dir='ltr' className='flex justify-center bg-blue-50 py-7'>
                    <Rating size='xl' defaultValue={rate} onChange={(e)=>setRate(e)}/>
                </div>

                <div className='text-center text-red-500 my-3'>{warning}</div>

                <div className='flex justify-center gap-5'>
                    <span onClick={() => setSlowTransitionOpenedRating(false)}>
                        <SecondaryButton title={t('cancel')} />
                    </span>
                    <span onClick={handleRating}>
                        <PrimaryButton title={t('submitRating')} />
                    </span>
                </div>
            </Modal>

        </>
    );
}