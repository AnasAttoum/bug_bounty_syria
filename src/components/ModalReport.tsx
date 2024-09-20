import { Button, FileButton, Group, Input, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import { IconClipboardText, IconCloudUpload } from '@tabler/icons-react';

import styles from '../styles/company.module.css'

export default function ModalReport({ opened, close }: { opened: boolean, close: () => void }) {

    const [report, setReport] = useState('')

    const [warning, setWarning] = useState('')

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: { target: { value: string, name: string } }) => {
        setReport(e.target.value)
    }

    const handleSendReport = () => {
        if (report === '')
            setWarning('اسم التقرير غير صالح')

        else if (!file)
            setWarning('التقرير غير صالح')

        else {
            console.log(report)
            console.log(file)
            close()
        }
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title=""
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{ transition: 'rotate-left' }}
            >
                <div className='flex flex-col gap-7' style={{}}>

                    <div className='text-center text-2xl' style={{ color: 'var(--primary)' }}>رفع تقرير جديد</div>

                    <Input.Wrapper className={styles.input}>
                        <Input placeholder="أدخل اسم التقرير" rightSection={<IconClipboardText size={16} />} name='report' onChange={handleChange} />
                    </Input.Wrapper>

                    <div className='flex flex-col'>
                        <Group justify="center">
                            <FileButton onChange={setFile} accept="txt">
                                {(props) => <Button {...props} variant="outline" color="primary.0" className={styles.btn2} style={{ width: '100%' }}><IconCloudUpload /></Button>}
                            </FileButton>
                        </Group>
                        {file && (
                            <Text size="sm" mt="sm" style={{ textAlign: 'center' }}>
                                Picked File: {file.name}
                            </Text>
                        )}

                        <div className='text-red-500 text-center mt-2'>{warning}</div>

                        <div className='flex gap-7 mt-5'>
                            <Button className={styles.btn} style={{ width: '45%' }} color="primary.0" onClick={handleSendReport}>إرسال التقرير</Button>
                            <Button variant="outline" color="primary.0" className={styles.btn2} style={{ width: '45%' }} onClick={close}>إلغاء الإرسال</Button>
                        </div>


                    </div>

                </div>


            </Modal>

        </>
    )
}
