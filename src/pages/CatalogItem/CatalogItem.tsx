import styles from './CatalogItem.module.css'
import {Button} from "@telegram-apps/telegram-ui";
import {Stars} from "@/pages/CatalogItem/Stars.tsx";

export interface CatalogItemProps {
    img: {
        src: string;
        alt: string;
    },
    price: string;
    handleClick: () => void;
}

export const CatalogItem = ({
                                img,
                                price,
                                handleClick
                            }: CatalogItemProps) => {
        return (
            <div className={styles.wrapper}>
                <img className={styles.image} {...img}/>
                <div className={styles.priceWrapper}><span className={styles.price}>{price}</span><Stars/></div>
                <Button className={styles.button} mode='filled' size='l' onClick={handleClick}>Купить</Button>
            </div>
        )
    }