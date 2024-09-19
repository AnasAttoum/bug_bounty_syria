import { Button, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { IconFilter } from '@tabler/icons-react';
import CompanyCard from '../components/CompanyCard';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { useRef, useState } from 'react';
import { company } from '../lib/slices/companySlice';

import styles from '../styles/CompanyCard.module.css'

export default function Main() {

    const companies = useSelector((state: RootState) => state.reducers.company)
    const [viewCompanies, setViewCompanies] = useState<company[]>(companies)
    const search = useRef<HTMLInputElement>(null)

    const handleChange = () => {
        if (search.current)
            setViewCompanies(
                companies.filter((company) => {
                    return company.name.includes(search.current?.value || '') || company.description.includes(search.current?.value || '')
                })
            )
    }

    return (
        <div className="flex flex-col gap-y-5 py-5 px-10" style={{ backgroundImage: 'url(/background.svg)' }}>
            <div className='text-2xl font-bold'>اكتشف الفرص الآن! </div>

            <div className='p-5 bg-white rounded-xl' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <div className='text-sm font-extrabold mb-2' style={{ color: 'var(--primary)' }}>أكثر من 127 شركة بانتظارك ماذا تنتظر ابدأ الآن!</div>

                <div className={`${styles.search} flex gap-2`}>
                    <Input placeholder="ابحث عن الشركة التي تريدها" rightSection={<IconSearch size={16} />} style={{ width: '95%' }} ref={search} />
                    <div className='flex gap-2'>
                        <div onClick={handleChange}>
                            <PrimaryButton title='ابحث' />
                        </div>
                        <Button variant="outline" color="primary.0"><IconFilter /></Button>
                    </div>
                </div>

            </div>

            <div className='text-center font-bold text-2xl mt-7'>مجموعة الشركات الموجودة</div>

            <div className='flex flex-wrap justify-evenly gap-5 mb-10'>
                {viewCompanies.map((company, index) => {
                    return <CompanyCard key={index} company={company} />
                })}
            </div>

        </div>
    )
}
