import { Button } from "@mantine/core";

import styles from '../../styles/buttons.module.css'

export default function PrimaryButton({title}:{title:string}) {
    return (
        <Button className={styles.btn} style={{ paddingInline: '10px' }} color="primary.0">{title}</Button>
    )
}
