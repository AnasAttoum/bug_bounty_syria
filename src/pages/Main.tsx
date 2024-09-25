import { Button, Input } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { IconFilter } from '@tabler/icons-react';
import CompanyCard from '../components/CompanyCard';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { useEffect, useRef, useState } from 'react';
import { company } from '../lib/slices/companySlice';

import styles from '../styles/companyCard.module.css'
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export default function Main() {

    const { t } = useTranslation()
    const companies = useSelector((state: RootState) => state.reducers.company)
    const [viewCompanies, setViewCompanies] = useState<company[]>(companies)
    const [filterCLick, setFilterClick] = useState(false)
    const filters = useRef({ availability: 'available', publicationDate: 'oldest' })
    const search = useRef<HTMLInputElement>(null)
    const { ref: cards, inView: cardsInView, entry: cardsEntry } = useInView()

    useEffect(() => {
        if (cardsInView)
            cardsEntry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animation 1s ${index / 2}s forwards`
            })
    }, [cardsInView, cardsEntry])

    const handleSearch = () => {
        if (search.current) {
            const filteredCompanies = companies.filter((company) => {
                return company.name.includes(search.current?.value || '') || company.description.includes(search.current?.value || '')
            });

            if (filters.current.publicationDate === 'newest') {
                filteredCompanies.reverse();
            }

            setViewCompanies(filteredCompanies);
        }
    }

    return (
        <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat' }}>
            <div className='relative'>
                <div className='text-2xl font-bold mb-4'>{t('discover')}</div>

                <div className='p-5 bg-white rounded-xl' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                    <div className='text-sm font-extrabold mb-2' style={{ color: 'var(--primary)' }}>{t('moreThan')}</div>

                    <div className={`${styles.search} flex gap-2`}>
                        <Input placeholder={t('searchAbout')} rightSection={<IconSearch size={16} />} style={{ width: '95%' }} ref={search} />
                        <div className='flex gap-2'>
                            <div onClick={handleSearch}>
                                <PrimaryButton title={t('search')} />
                            </div>
                            <Button variant="outline" color="primary.0" onClick={() => setFilterClick(prev => !prev)}><IconFilter /></Button>
                        </div>
                    </div>

                </div>

                {filterCLick &&
                    <div className={`${styles.filters} bg-white absolute top-40 ${document.body.dir === 'rtl' ? 'left-10' : 'right-10'} rounded-lg z-10 px-3 page`} style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>
                        <div className='flex justify-start'><IconX stroke={2} className='cursor-pointer' onClick={() => setFilterClick(false)} /></div>
                        <div className='flex flex-col justify-evenly gap-3 pb-5'>
                            <div className='text-center'>{t('sortBy')}</div>

                            <div className='flex justify-evenly items-center'>
                                <div>{t('availability')}: </div>
                                <div className='px-3 rounded-lg cursor-pointer' style={filters.current.availability === 'available' ? { backgroundColor: 'var(--primary)', color: 'white' } : {}} onClick={() => { filters.current = { ...filters.current, availability: 'available' }; handleSearch() }}>{t('available')}</div>
                                <div className='px-3 rounded-lg cursor-pointer' style={filters.current.availability === 'notAvailable' ? { backgroundColor: 'var(--primary)', color: 'white' } : {}} onClick={() => { filters.current = { ...filters.current, availability: 'notAvailable' }; handleSearch() }}>{t('notAvailable')}</div>
                            </div>

                            <div className='flex justify-evenly items-center'>
                                <div>{t('publicationDate')}: </div>
                                <div className='px-3 rounded-lg cursor-pointer' style={filters.current.publicationDate === 'newest' ? { backgroundColor: 'var(--primary)', color: 'white' } : {}} onClick={() => { filters.current = { ...filters.current, publicationDate: 'newest' }; handleSearch() }}>{t('newest')}</div>
                                <div className='px-3 rounded-lg cursor-pointer' style={filters.current.publicationDate === 'oldest' ? { backgroundColor: 'var(--primary)', color: 'white' } : {}} onClick={() => { filters.current = { ...filters.current, publicationDate: 'oldest' }; handleSearch() }}>{t('oldest')}</div>
                            </div>

                        </div>
                    </div>
                }
            </div>

            <div className='text-center font-bold text-2xl py-1 px-10 mt-6 page'>{t('groupOfCompanies')}</div>

            <div className='flex flex-wrap justify-evenly gap-5 mb-10' ref={cards}>
                {viewCompanies.map((company, index) => {
                    return <CompanyCard key={index} company={company} />
                })}
            </div>

        </div>
    )
}
