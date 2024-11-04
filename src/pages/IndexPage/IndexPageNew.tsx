import {Button} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './IndexPageNew.module.css'

export const IndexPageNew: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Подтверждение</h2>
            <p className={styles.description}>Нажимая на кнопку "Продолжить", Вы подтверждаете, что вам исполнилось 18
                лет. В ином случае - закройте приложение</p>
            <div className={styles.buttonWrapper}>
                <Button mode='filled' size='l' onClick={() => {
                    navigate('/wheel')
                    localStorage.setItem('18', 'true')
                }}>Продолжить</Button>
                <Button mode='white' size='l'>Закрыть</Button>
            </div>
        </div>
    )
};
