import { IconBookmark, IconBookmarkFilled, IconStar } from '@tabler/icons-react';
import { useState } from 'react';
import SecondaryButton from './buttons/SecondaryButton';

import styles from '../styles/companyCard.module.css'
import { Link } from 'react-router-dom';
import { securityResearcher } from '../lib/slices/securityResearcherSlice';

export default function SecurityResearcherCard({ SR: { id, image, name, rate, description } }: { SR: securityResearcher }) {

  const [save, setSave] = useState<boolean>(false)

  return (
    <div className={`${styles.card} flex flex-col justify-between gap-3 p-5 bg-white rounded-lg opacity-0`} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', width: '300px' }}>

      <div className='flex justify-between items-center'>

        <div className='flex gap-3 items-center'>
          <img src={image} alt={name} style={{ width: '58px', height: '58px', borderRadius: '50%' }} />
          <div className='text-lg font-bold'>{name}</div>
        </div>

        <div className='cursor-pointer' onClick={() => { setSave(prev => !prev) }}>
          {save ? <IconBookmarkFilled color='var(--primary)' /> : <IconBookmark color='var(--primary)' />}
        </div>

      </div>

      <div className='flex gap-1 px-3'>
        <IconStar stroke={2} />
        <div>{rate} / 5.0</div>
      </div>

      <div className='px-3 text-justify' style={{ display: '-webkit-box', lineClamp: '6', WebkitLineClamp: '6', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</div>

      <Link to={`/sr/${id}`} style={{ display: 'contents' }}>
        <SecondaryButton title='قراءة المزيد' />
      </Link>

    </div>
  )
}
