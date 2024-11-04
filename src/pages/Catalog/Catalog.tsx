import styles from './Catalog.module.css'
import {CatalogItem} from "@/pages/CatalogItem/CatalogItem.tsx";
import WebApp from '@twa-dev/sdk';

const items = [
    {
        img: {
            src: './sabotage-app/ann_1.jpg',
            alt: 'Anna Sabotage'
        },
        price: '1',
        handleClick: () => {
            WebApp.showConfirm('Подтвердите, что вам есть 18 лет', (confirmed) => {
                console.log(confirmed);
            })
        }
    },
    {
        img: {
            src: './sabotage-app/ann_2.jpg',
            alt: 'Anna Sabotage'
        },
        price: '1',
        handleClick: () => {
            WebApp.showConfirm('Подтвердите, что вам есть 18 лет', (confirmed) => {
                console.log(confirmed);
            })
        }
    },
    {
        img: {
            src: './sabotage-app/ann_3.jpg',
            alt: 'Anna Sabotage'
        },
        price: '1',
        handleClick: () => {
            WebApp.showConfirm('Подтвердите, что вам есть 18 лет', (confirmed) => {
                console.log(confirmed);
            })
        }
    },
    {
        img: {
            src: './sabotage-app/ann_4.jpg',
            alt: 'Anna Sabotage'
        },
        price: '1',
        handleClick: () => {
            WebApp.showConfirm('Подтвердите, что вам есть 18 лет', (confirmed) => {
                console.log(confirmed);
            })
        }
    },
    {
        img: {
            src: './sabotage-app/ann_5.jpg',
            alt: 'Anna Sabotage'
        },
        price: '1',
        handleClick: () => {
            WebApp.showConfirm('Подтвердите, что вам есть 18 лет', (confirmed) => {
                console.log(confirmed);
            })
        }
    },
    {
        img: {
            src: './sabotage-app/ann_6.jpg',
            alt: 'Anna Sabotage'
        },
        price: '1',
        handleClick: () => {
            WebApp.showConfirm('Подтвердите, что вам есть 18 лет', (confirmed) => {
                console.log(confirmed);
            })
        }
    },
]


export const Catalog = () => {
    return (
        <div className={styles.wrapper}>
            {items.map((item, idx) => <CatalogItem key={idx} {...item} />)}
        </div>
    )
}