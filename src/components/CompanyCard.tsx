import { IconBookmark, IconBookmarkFilled, IconWorld, IconExternalLink, IconUsers, IconBuilding } from '@tabler/icons-react';
import { useState } from 'react';
import SecondaryButton from './buttons/SecondaryButton';
import { company } from '../lib/slices/companySlice';

import styles from '../styles/CompanyCard.module.css'
import { Link } from 'react-router-dom';

export default function CompanyCard({ company: { id, image, name, link, description, people, type } }: { company: company }) {

  const [save, setSave] = useState<boolean>(false)

  return (
    <div className={`${styles.card} flex flex-col justify-between gap-3 p-5 bg-white rounded-lg`} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', width: '300px' }}>

      <div className='flex justify-between items-center'>

        <div className='flex gap-3 items-center'>
          <img src={image} alt={name} style={{ width: '58px', height: '58px' }} />
          <div className='text-lg font-bold'>{name}</div>
        </div>

        <div className='cursor-pointer' onClick={() => { setSave(prev => !prev) }}>
          {save ? <IconBookmarkFilled color='var(--primary)' /> : <IconBookmark color='var(--primary)' />}
        </div>

      </div>

      <a href={link.trim().startsWith('www.') ? `https://${link.trim()}` : link} target='_blank' rel="noopener noreferrer">
        <div className='flex gap-1 px-3'>
          <IconWorld />
          <div>www.adobe.com</div>
          <IconExternalLink style={{ transform: 'rotateY(180deg)' }} />
        </div>
      </a>

      <div className='px-3 text-justify' style={{ display: '-webkit-box', lineClamp: '6', WebkitLineClamp: '6', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</div>

      <div className={`${styles.details} flex px-3 mt-4 gap-7`}>
        <div className='flex gap-3'><IconUsers color='var(--primary)' /> {people}</div>
        <div className='flex gap-3'><IconBuilding color='var(--primary)' />{type}</div>
      </div>

      <Link to={`/company/${id}`} style={{display:'contents'}}>
          <SecondaryButton title='قراءة المزيد' />
      </Link>

    </div>
  )
}
