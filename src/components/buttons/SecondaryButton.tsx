import { Button } from "@mantine/core";

import styles from '../../styles/buttons.module.css'

export default function SecondaryButton({title}:{title:string}) {
    return (
        <Button variant="outline" color="primary.0" className={styles.btn2}>{title}</Button>
    )
}
