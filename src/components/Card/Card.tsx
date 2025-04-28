import styles from "./Card.module.scss";
import classnames from 'classnames';
import {ReactNode} from "react";

interface CardProps {
    children: ReactNode;
    title: string;
    size: 'lg' | 'sm'
}

export const Card = ({
    children,
    title,
    size = 'sm'
}: CardProps) => {
    return (
        <div className={classnames( styles.card, styles[size] )}>
            { title && (
                <h3 className={styles.title}>{title}</h3>
            )}

            {children}
        </div>
    )
}