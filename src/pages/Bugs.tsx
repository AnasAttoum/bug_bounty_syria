import { Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@mantine/core';
import { useState } from 'react';

import styles from '../styles/bugs.module.css'

export default function Bugs() {

  const [page, setPage] = useState(1);
  const { t } = useTranslation()

  const elements = [
    { bugName: 'تسجيل', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'نقل بيانات', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'DDoS', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },


    { bugName: 'برمجيات خبيثة', companyName: '5', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: '10', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: '15', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Accept', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Pending', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: 'دربني', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },
    { bugName: 'برمجيات خبيثة', companyName: '20', submissionDate: '11/05/2024', bugFile: 'FirstOne.pdf', bugStatus: 'Reject', bugAssessment: '5' },

  ];

  const rows = elements.slice(15 * (page - 1), 15 * (page - 1) + 15).map((element, index) => (
    <Table.Tr key={index} style={index % 2 !== 0 ? { backgroundColor: '#0001' } : {}}>
      <Table.Td>{element.bugName}</Table.Td>
      <Table.Td>{element.companyName}</Table.Td>
      <Table.Td>{element.submissionDate}</Table.Td>
      <Table.Td>{element.bugFile}</Table.Td>
      <Table.Td>
        {element.bugStatus === 'Accept' ?
          <span style={{ color: '#008767', backgroundColor: '#00B08777', border: '1px solid #008767', borderRadius: '4px', paddingInline: '5px' }}>Accept</span>
          : element.bugStatus === 'Pending' ?
            <span style={{ color: '#58595B', backgroundColor: '#58595B77', border: '1px solid #58595B', borderRadius: '4px', paddingInline: '5px' }}>Pending</span>
            :
            <span style={{ color: '#DF0404', backgroundColor: '#FFC5C5', border: '1px solid #DF0404', borderRadius: '4px', paddingInline: '5px' }}>Reject</span>
        }
      </Table.Td>
      <Table.Td>{element.bugAssessment} / 10</Table.Td>
    </Table.Tr>
  ));


  return (
    <div className="flex flex-col gap-y-5 py-5 px-10 page" style={{ backgroundImage: 'url(/background.svg)', backgroundRepeat: 'no-repeat', minHeight: '72vh' }}>
      
      <div className={styles.table}>
        <Table stickyHeader stickyHeaderOffset={60} verticalSpacing="lg">
          <Table.Thead>
            <Table.Tr style={{ color: 'var(--primary)', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
              <Table.Th>{t('bugName')}</Table.Th>
              <Table.Th>{t('companyName')}</Table.Th>
              <Table.Th>{t('submissionDate')}</Table.Th>
              <Table.Th>{t('bugFile')}</Table.Th>
              <Table.Th>{t('bugStatus')}</Table.Th>
              <Table.Th>{t('bugAssessment')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>

      <Pagination total={Math.ceil(elements.length / 15)} color="var(--primary)" value={page} onChange={(e) => setPage(e)} />

    </div>
  )
}
