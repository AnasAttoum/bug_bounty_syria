import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../lib/store"
import { company } from "../lib/slices/companySlice"
import { IconBookmark, IconBookmarkFilled, IconBuilding, IconExternalLink, IconUsers, IconWorld, IconCloudUpload } from "@tabler/icons-react"
import { Button } from "@mantine/core"

import styles from '../styles/company.module.css'
import CompanyCard from "../components/CompanyCard"
import { useDisclosure } from "@mantine/hooks"
import ModalReport from "../components/ModalReport"

export default function Company() {

    const companies = useSelector((state: RootState) => state.reducers.company)

    const { id } = useParams()

    const [save, setSave] = useState<boolean>(false)
    const [company, setCompany] = useState<company>({
        image: '',
        name: '',
        link: '',
        description: '',
        people: '',
        type: '',
    })
    const { image, name, link, description, people, type } = company

    useEffect(() => {
        let x = { image: '', name: '', link: '', description: '', people: '', type: '' }
        if (id)
            x = companies.find((company) => { return company.id === parseInt(id) }) || { image: '', name: '', link: '', description: '', people: '', type: '' }
        setCompany(x)
    }, [companies, id])

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)',backgroundRepeat:'no-repeat' }}>

                <div className={`${styles.container} flex justify-between gap-5 mb-10`}>

                    <div className="flex flex-col gap-7" style={{ width: '45vw' }}>

                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center'>
                                <img src={image} alt={name} style={{ width: '58px', height: '58px' }} />
                                <div className='text-lg font-extrabold'>{name}</div>
                            </div>

                            <div className='cursor-pointer' onClick={() => { setSave(prev => !prev) }}>
                                {save ? <IconBookmarkFilled color='var(--primary)' /> : <IconBookmark color='var(--primary)' />}
                            </div>
                        </div>

                        <a href={link.trim().startsWith('www.') ? `https://${link.trim()}` : link} target='_blank' rel="noopener noreferrer">
                            <div className='flex gap-1 px-3'>
                                <IconWorld />
                                <div>{link}</div>
                            </div>
                        </a>

                        <div className='px-3 text-justify'>{description}</div>

                        <div className='flex gap-3'><IconBuilding color='var(--primary)' />{type}</div>
                        <div className='flex gap-3'><IconUsers color='var(--primary)' /> {people}</div>

                        <div className="flex gap-5">
                            <a href={link.trim().startsWith('www.') ? `https://${link.trim()}` : link} target='_blank' rel="noopener noreferrer">
                                <Button className={styles.btn} style={{ paddingInline: '10px' }} color="primary.0">زيارة الموقع &nbsp;<IconExternalLink size={13} style={{ transform: 'rotateY(180deg)' }} /></Button>
                            </a>
                            <Button variant="outline" color="primary.0" className={styles.btn2} onClick={open}>رفع تقرير &nbsp;<IconCloudUpload size={13} style={{ transform: 'rotateY(180deg)' }} /></Button>
                        </div>

                    </div>

                    <img src="/images/companies/image.png" alt="image" style={{ width: '45vw' }} />


                </div>

                <div className="font-extrabold">شركات مقترحة</div>

                <div className='flex flex-wrap justify-evenly gap-5 mb-10'>
                    {companies.slice(0, 4).map((company, index) => {
                        return <CompanyCard key={index} company={company} />
                    })}
                </div>

            </div>

            <ModalReport opened={opened} close={close} />
        </>
    )
}
