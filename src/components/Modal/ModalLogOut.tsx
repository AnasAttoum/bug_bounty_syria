import { Dispatch, SetStateAction } from 'react';
import { Modal } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../lib/store';
import { logOut } from '../../lib/slices/userSlice';

export default function ModalLogOut({ slowTransitionOpenedLogOut, setSlowTransitionOpenedLogOut }: { slowTransitionOpenedLogOut: boolean, setSlowTransitionOpenedLogOut: Dispatch<SetStateAction<boolean>> }) {

    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <Modal
                opened={slowTransitionOpenedLogOut}
                onClose={() => setSlowTransitionOpenedLogOut(false)}
                title={t('logOut?')}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{ transition: 'rotate-left' }}
            >
                <div className='flex justify-center gap-5'>
                    <span onClick={() => setSlowTransitionOpenedLogOut(false)}>
                        <PrimaryButton title={t('cancel')} />
                    </span>
                    <span onClick={() => { dispatch(logOut()) }}>
                        <SecondaryButton title={t('logOut')} />
                    </span>
                </div>
            </Modal>

        </>
    );
}