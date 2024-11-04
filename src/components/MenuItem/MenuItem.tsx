import styles from './MenuItem.module.css'
import {ReactNode} from "react";
import {Link} from "@/components/Link/Link";

export interface MenuItemProps {
    icon: ReactNode;
    href: string;
    title?: string;
    isRounded?: boolean;
}

export const MenuItem = ({icon, title, href, isRounded}: MenuItemProps) => {
    return (
        <li className={[styles.wrapper, isRounded && styles.wrapperRounded].filter(Boolean).join(' ')}>
            <Link className={styles.link} to={href}>
                {icon}
                <span className={styles.title}>{title}</span>
            </Link>
        </li>
    )
}