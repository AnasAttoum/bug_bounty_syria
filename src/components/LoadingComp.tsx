import styles from '../styles/loading.module.css'

export default function LoadingComp() {
    return (
        <div className="flex flex-col justify-center items-center" >
            <div className={styles.loader}></div>
        </div>
    )
}
