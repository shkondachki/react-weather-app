import styles from "./Card.module.scss";
import classnames from 'classnames';
import {ReactNode} from "react";

interface CardProps {
    children: ReactNode;
    title: string;
    size: 'lg' | 'sm';
    className?: string;
}

export const Card = ({
    children,
    title,
    size = 'sm',
    className
}: CardProps) => {
    return (
        children && (
            <div className={classnames( styles.card, styles[size], className && styles[className] )}>
                { title && (
                    <h3 className={styles.title}>{title}</h3>
                )}

                {children}
            </div>
        )
    )
}