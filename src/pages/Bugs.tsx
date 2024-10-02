import { Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@mantine/core';
import { useState } from 'react';

import styles from '../styles/bugs.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { IconCirclePlus } from '@tabler/icons-react';
import ModalRating from '../components/Modal/ModalRating';

export default function Bugs() {

  const { user } = useSelector((state: RootState) => state.reducers.user)
  const { signUpType } = user

  const [page, setPage] = useState(1);
  const [slowTransitionOpenedRating, setSlowTransitionOpenedRating] = useState(false);
  const { t } = useTranslation()

  const elements = [
    { bugName: 'تسجيل', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'نقل بيانات', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '0' },
    { bugName: 'DDoS', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '0' },


    { bugName: 'برمجيات خبيثة', name: '5', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: '10', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: '15', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', name: '20', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },

  ];

  const rows = elements.slice(15 * (page - 1), 15 * (page - 1) + 15).map((element, index) => (
    <Table.Tr key={index} style={index % 2 !== 0 ? { backgroundColor: '#0001' } : {}}>
      <Table.Td>{element.bugName}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.submissionDate}</Table.Td>
      <Table.Td>{element.bugFile}</Table.Td>
      <Table.Td>
        {element.bugStatus === 'Accept' ?
          <span style={{ color: 'var(--accept)', backgroundColor: 'var(--acceptOpacity)', border: '1px solid var(--accept)', borderRadius: '4px', paddingInline: '5px' }}>Accept</span>
          : element.bugStatus === 'Pending' ?
            <span style={{ color: 'var(--pending)', backgroundColor: 'var(--pendingOpacity)', border: '1px solid var(--pending)', borderRadius: '4px', paddingInline: '5px' }}>Pending</span>
            :
            <span style={{ color: 'var(--reject)', backgroundColor: 'var(--rejectOpacity)', border: '1px solid var(--reject)', borderRadius: '4px', paddingInline: '5px' }}>Reject</span>
        }
      </Table.Td>
      <Table.Td>
        {(signUpType as number) === 0 ?
          parseInt(element.bugAssessment) === 0 ? <span><IconCirclePlus stroke={2} style={{ cursor: 'pointer' }} onClick={()=>setSlowTransitionOpenedRating(true)} /></span> : <span>{element.bugAssessment} / 5</span>
          :
          parseInt(element.bugAssessment) === 0 ? <span>{t('notYet')}</span> : <span>{element.bugAssessment} / 5</span>
        }
      </Table.Td>
    </Table.Tr>
  ));


  return (
    <>
      <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat', minHeight: '72vh' }}>

        <div className={styles.table}>
          <Table stickyHeader stickyHeaderOffset={60} verticalSpacing="lg">
            <Table.Thead>
              <Table.Tr style={{ color: 'var(--primary)', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Table.Th>{t('bugName')}</Table.Th>
                <Table.Th>{(signUpType as number) === 0 ? t('researcherName') : t('companyName')}</Table.Th>
                <Table.Th>{t('submissionDate')}</Table.Th>
                <Table.Th>{t('bugFile')}</Table.Th>
                <Table.Th>{t('bugStatus')}</Table.Th>
                <Table.Th>{(signUpType as number) === 0 ? t('addBugRating') : t('bugAssessment')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>

        <Pagination total={Math.ceil(elements.length / 15)} color="var(--primary)" value={page} onChange={(e) => setPage(e)} />

      </div>

      <ModalRating slowTransitionOpenedRating={slowTransitionOpenedRating} setSlowTransitionOpenedRating={setSlowTransitionOpenedRating} />
    </>
  )
}
