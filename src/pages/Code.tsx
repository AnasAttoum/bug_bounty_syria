import { Input } from "@mantine/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useInView } from "react-intersection-observer"
import { useNavigate, useParams } from "react-router-dom"

import styles from '../styles/signUp.module.css';
import { IconCode } from "@tabler/icons-react"
import PrimaryButton from "../components/buttons/PrimaryButton"
import LoadingComp from "../components/LoadingComp"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../lib/store"
import { code } from "../lib/slices/userSlice"
import { unwrapResult } from "@reduxjs/toolkit"

export default function Code() {

    const { ref: signUp, inView: signUpInView, entry: signUpEntry } = useInView()
    const { uuid } = useParams()
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { loadingCode } = useSelector((state: RootState) => state.reducers.user)
    const [data, setData] = useState('')
    const [warning, setWarning] = useState('')
    const [error, setError] = useState('')

    const handleContinue = () => {
        console.log(data)
        if (data === '' || data.length !== 8)
            setWarning(t('invalidEntry'))
        else {
            setWarning('')

            const formData = new FormData()
            formData.append('code', data)

            if (uuid !== undefined)
                dispatch(code({ uuid: uuid, data: formData })).then(unwrapResult).then(result => {
                    if (typeof result !== 'string')
                        navigate('/login')
                    else {
                        setError(result)
                    }
                })

            setWarning('')
        }
    }

    useEffect(() => {
        if (signUpInView)
            signUpEntry?.target.classList.add('toBottomAnimation')
    }, [signUpInView, signUpEntry])

    return (
        <div className='flex justify-center items-center p-10' style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat', minHeight: 'calc(100vh - 200px)' }}>

            <div className={`flex flex-col justify-center p-3 rounded-lg opacity-0 bg-white`} style={{ width: '50vw', height: '300px', marginTop: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} ref={signUp}>
                <div className='text-center text-2xl font-bold'>{t('enterCode')}</div>
                <div className='text-center text-gray-500 font-bold mt-1 mb-2'>{t('codeContains')}</div>

                <Input.Wrapper error={warning} className={styles.input} style={{ width: '100%' }}>
                    <Input placeholder={t('enterCode')} rightSection={<IconCode size={16} />} name='code' onChange={(e) => setData(e.target.value)} />
                </Input.Wrapper>

                <div className='text-center text-red-500 text-xs'>{error}</div>


                <div className='flex flex-col items-center gap-7 my-5'>
                    <div onClick={handleContinue}>
                        <PrimaryButton title={t('pass')} />
                    </div>
                    {loadingCode === 'pending' && <LoadingComp />}
                </div>

            </div>


        </div>
    )
}