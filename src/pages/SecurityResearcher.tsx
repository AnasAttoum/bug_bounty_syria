import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../lib/store"
import { IconBookmark, IconBookmarkFilled, IconPhone, IconStar } from "@tabler/icons-react"
import { Avatar, Button } from "@mantine/core"

import styles from '../styles/company.module.css'
import { useInView } from "react-intersection-observer"
import { useTranslation } from "react-i18next"
import ModalRating from "../components/Modal/ModalRating"
import { SR } from "../lib/slices/userSlice"

export default function SecurityResearcher() {

    const { SRs } = useSelector((state: RootState) => state.reducers.user)

    const { id } = useParams()
    const { t } = useTranslation()

    const [save, setSave] = useState<boolean>(false)
    const [slowTransitionOpenedRating, setSlowTransitionOpenedRating] = useState(false);
    const [SR, setSR] = useState<SR>({
        code: '',
        id: '',
        name: '',
        image: '',
        email: '',
        phone: '',
        points: ''
    })
    const { ref: cards, inView: cardsInView, entry: cardsEntry } = useInView()
    const { ref: img, inView: imgInView, entry: imgEntry } = useInView()
    useEffect(() => {
        if (imgInView)
            imgEntry?.target.classList.add('toBottomAnimation')
    }, [imgInView, imgEntry])

    useEffect(() => {
        let x;
        if (id) {
            x = SRs.find((sr) => { return sr.id === id })
            if (x)
                setSR(x)
        }
    }, [SRs, id])

    useEffect(() => {
        if (cardsInView)
            cardsEntry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animation 1s ${index / 2}s forwards`
            })
    }, [cardsInView, cardsEntry])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }, [])

    const { image, name, points: rate } = SR


    return (
        <>
            <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat' }}>

                <div className={`${styles.container} flex justify-between gap-5 mb-10`}>

                    <div className="flex flex-col justify-around gap-7" style={{ width: '45vw' }}>

                        <div className="flex flex-col gap-7">
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-3 items-center'>
                                    {image === null ?
                                        <Avatar color="red" radius="xl" name={name} style={{ outline: '2px solid var(--primary)', outlineOffset: '3px', cursor: 'pointer' }} />
                                        :
                                        <img src={image} alt={name} style={{ width: '58px', height: '58px', borderRadius: '50%' }} />
                                    }
                                    <div className='text-lg font-extrabold'>{name}</div>
                                </div>

                                <div className='cursor-pointer' onClick={() => { setSave(prev => !prev) }}>
                                    {save ? <IconBookmarkFilled color='var(--primary)' /> : <IconBookmark color='var(--primary)' />}
                                </div>
                            </div>


                            {/* <div className='px-3 text-justify'>{description}</div> */}

                            <div className='flex gap-1 px-3'>
                                <IconStar color='var(--primary)' />
                                <div>{rate} / 5.0</div>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <Link to={'tel:+963951-931-846'} target="_blank">
                                <Button className={styles.btn} style={{ paddingInline: '10px' }} color="primary.0">{t('directContact')} &nbsp;<IconPhone size={13} style={{ transform: 'rotateY(180deg)' }} /></Button>
                            </Link>
                            <Button variant="outline" color="primary.0" className={styles.btn2} onClick={() => setSlowTransitionOpenedRating(true)}> {t('SRAssessment')} &nbsp;<IconStar size={13} style={{ transform: 'rotateY(180deg)' }} /></Button>
                        </div>

                    </div>

                    <img src="/images/companies/imageSR.png" alt="image" style={{ width: '45vw', opacity: '0' }} ref={img} />


                </div>

                <div className="font-extrabold">{t('companyPrograms')}</div>

                <div className='flex flex-col gap-5' ref={cards}>
                    <div className={`${styles.head} flex justify-evenly`} style={{ color: 'var(--primary)', borderBottom: '1px solid var(--primary)' }}>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{t('bugName')}</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{t('submissionDate')}</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{t('bugAssessment')}</div>
                    </div>
                    <div className={`${styles.row} flex gap-5 justify-evenly py-3`} style={{ borderBottom: '1px solid #999' }}>
                        <div style={{ width: '30vw', textAlign: 'center' }}>نقل بيانات</div>
                        <div style={{ width: '30vw', textAlign: 'center', marginInline: '10px' }}>11/05/2024</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{rate} / 5.0</div>
                    </div>
                    <div className={`${styles.row} flex gap-5 justify-evenly py-3`} style={{ borderBottom: '1px solid #999' }}>
                        <div style={{ width: '30vw', textAlign: 'center' }}>برمجيات خبيثة</div>
                        <div style={{ width: '30vw', textAlign: 'center', marginInline: '10px' }}>11/05/2024</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{rate} / 5.0</div>
                    </div>
                    <div className={`${styles.row} flex gap-5 justify-evenly py-3`} style={{ borderBottom: '1px solid #999' }}>
                        <div style={{ width: '30vw', textAlign: 'center' }}>DDoS</div>
                        <div style={{ width: '30vw', textAlign: 'center', marginInline: '10px' }}>11/05/2024</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{rate} / 5.0</div>
                    </div>


                    <div className={`${styles.row} flex gap-5 justify-evenly py-3`}>
                        <div style={{ width: '30vw', textAlign: 'center' }}>تسجيل</div>
                        <div style={{ width: '30vw', textAlign: 'center', marginInline: '10px' }}>11/05/2024</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{rate} / 5.0</div>
                    </div>
                </div>

            </div>

            <ModalRating slowTransitionOpenedRating={slowTransitionOpenedRating} setSlowTransitionOpenedRating={setSlowTransitionOpenedRating} />
        </>
    )
}
