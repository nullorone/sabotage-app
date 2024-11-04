import styles from './Purchases.module.css'

export const Purchases = () => {
    return <div className={styles.wrapper}>
        <div className={styles.content}>
            <h2 className={styles.title}>Покупок еще нет</h2>
            <span className={styles.subtitle}>:(</span>
        </div>
    </div>
}