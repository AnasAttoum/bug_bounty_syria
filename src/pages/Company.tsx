import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch } from "../lib/store"
import { IconBookmark, IconBookmarkFilled, IconBuilding, IconExternalLink, IconUsers, IconWorld, IconCloudUpload } from "@tabler/icons-react"
import { Button } from "@mantine/core"

import styles from '../styles/company.module.css'
import { useDisclosure } from "@mantine/hooks"
import ModalReport from "../components/Modal/ModalReport"
import { useInView } from "react-intersection-observer"
import { useTranslation } from "react-i18next"
import { company, companyProfile } from "../lib/slices/userSlice"
import { unwrapResult } from "@reduxjs/toolkit"

export default function Company() {

    const { id } = useParams()
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()

    const [save, setSave] = useState<boolean>(false)
    const [company, setCompany] = useState<company>({
        image: '',
        name: '',
        domain: '',
        description: '',
        people: '',
        type: '',
    })
    const [programs, setPrograms] = useState<{ uuid: string, title: string, url: string, description: string }[]>([])
    const [uuid, setUUID] = useState<string>('')
    const { image, name, domain: link, description, people, type } = company
    const { ref: cards, inView: cardsInView, entry: cardsEntry } = useInView()
    const { ref: img, inView: imgInView, entry: imgEntry } = useInView()
    useEffect(() => {
        if (imgInView)
            imgEntry?.target.classList.add('toBottomAnimation')
    }, [imgInView, imgEntry])

    useEffect(() => {
        if (id)
            dispatch(companyProfile(id)).then(unwrapResult).then(result => {
                if (typeof result !== 'string') {
                    setCompany({
                        image: result.data.data["company-data"].logo,
                        name: result.data.data["company-data"].name,
                        domain: result.data.data["company-data"].domain,
                        description: result.data.data["company-data"].description,
                        people: result.data.data["company-data"].employess_count,
                        type: result.data.data["company-data"].type,
                    })
                    setPrograms(result.data.data["company-data"].products)
                }
                else {
                    console.log('2')
                }
            })
    }, [id, dispatch])

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

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat' }}>

                <div className={`${styles.container} flex justify-between gap-5 mb-10`}>

                    <div className="flex flex-col gap-7" style={{ width: '45vw' }}>

                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <img src={image} alt={name} style={{ width: '58px', height: '58px', borderRadius: '50%' }} />
                                <div className='text-lg font-extrabold'>{name}</div>
                            </div>

                            <div className='cursor-pointer' onClick={() => { setSave(prev => !prev) }}>
                                {save ? <IconBookmarkFilled color='var(--primary)' /> : <IconBookmark color='var(--primary)' />}
                            </div>
                        </div>

                        <a href={link.trim().startsWith('www.') ? `https://${link.trim()}` : link} target='_blank' rel="noopener noreferrer">
                            <div className='flex gap-1 px-3'>
                                <IconWorld color='var(--primary)' />
                                <div>{link}</div>
                            </div>
                        </a>

                        <div className='px-3 text-justify'>{description}</div>

                        <div className='flex gap-3'><IconBuilding color='var(--primary)' />{type}</div>
                        <div className='flex gap-3'><IconUsers color='var(--primary)' /> {people}</div>

                        <div className="flex gap-5">
                            <a href={link.trim().startsWith('www.') ? `https://${link.trim()}` : link} target='_blank' rel="noopener noreferrer">
                                <Button className={styles.btn} style={{ paddingInline: '10px' }} color="primary.0">{t('visitSite')} &nbsp;<IconExternalLink size={13} style={{ transform: 'rotateY(180deg)' }} /></Button>
                            </a>
                        </div>

                    </div>

                    <img src="/images/companies/image.png" alt="image" style={{ width: '45vw', opacity: '0' }} ref={img} />


                </div>

                <div className="font-extrabold">{t('companyPrograms')}</div>

                <div className='flex flex-col gap-5' ref={cards}>
                    <div className={`${styles.head} flex justify-evenly`} style={{ color: 'var(--primary)', borderBottom: '1px solid var(--primary)' }}>
                        <div style={{ width: '20vw', textAlign: 'center' }}>{t('programName')}</div>
                        <div style={{ width: '20vw', textAlign: 'center' }}>{t('programLink')}</div>
                        <div style={{ width: '30vw', textAlign: 'center' }}>{t('description')}</div>
                        <div style={{ width: '10vw', textAlign: 'center' }}></div>
                    </div>
                    {programs.map(({ uuid, title, url, description }, index) => {
                        return <div className={`${styles.row} flex gap-5 justify-evenly py-3`} style={index + 1 === programs.length ? {} : { borderBottom: '1px solid #999' }}>
                            <div style={{ width: '20vw', textAlign: 'center' }}>{title}</div>
                            <div style={{ width: '20vw', textAlign: 'center', marginInline: '10px' }}>{url}</div>
                            <div style={{ width: '30vw', textAlign: 'justify' }}>{description}</div>
                            <Button variant="outline" color="primary.0" className={styles.btn2} onClick={() => { open(); setUUID(uuid) }}> {t('submitReport')} &nbsp;<IconCloudUpload size={13} style={{ transform: 'rotateY(180deg)' }} /></Button>
                        </div>
                    })}
                    {/* <div className={`${styles.row} flex gap-5 justify-evenly py-3`} style={{ borderBottom: '1px solid #999' }}>
                        <div style={{ width: '20vw', textAlign: 'center' }}>البرنامج الأول</div>
                        <div style={{ width: '20vw', textAlign: 'center', marginInline: '10px' }}>www.FirstApp.com</div>
                        <div style={{ width: '40vw', textAlign: 'justify' }}>البرنامج الأول هو عبارة تطبيق يعمل حل مشكلة التطبيق الذي يعمل على إيجاد مشكلة لبرنامج معين بناء على تطبيقات</div>
                    </div>
                    <div className={`${styles.row} flex gap-5 justify-evenly py-3`}>
                        <div style={{ width: '20vw', textAlign: 'center' }}>البرنامج الأول</div>
                        <div style={{ width: '20vw', textAlign: 'center', marginInline: '10px' }}>www.FirstApp.com</div>
                        <div style={{ width: '40vw', textAlign: 'justify' }}>البرنامج الأول هو عبارة تطبيق يعمل حل مشكلة التطبيق الذي يعمل على إيجاد مشكلة لبرنامج معين بناء على تطبيقات</div>
                    </div> */}
                </div>

            </div>

            <ModalReport opened={opened} close={close} uuid={uuid} />
        </>
    )
}
