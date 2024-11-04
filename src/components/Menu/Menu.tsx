import styles from './Menu.module.css'
import {MenuItem} from "@/components/MenuItem/MenuItem.tsx";


import {BookHeart, LayoutGrid, LoaderPinwheel} from "lucide-react";

const items = [
    {
        icon: <LayoutGrid size={32}/>,
        title: 'Каталог',
        href: '/catalog'
    },
    {
        icon: <LoaderPinwheel size={72}/>,
        title: 'Фортуна',
        href: '/wheel',
        isRounded: true,
    },
    {
        icon: <BookHeart size={32}/>,
        title: 'Покупки',
        href: '/purchases'
    },
]

export const Menu = () => (
    <><div className={styles.wrapper}>
        <ul className={styles.list}>
            {items.map((item, idx) => <MenuItem key={idx} {...item} />)}
        </ul>
    </div></>
)