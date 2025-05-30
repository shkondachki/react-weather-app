import { useContext } from 'react';
import {ThemeContext} from "../../context/ThemeContext.tsx";
import styles from "./ThemeToggleButton.module.scss";
import {Card} from "../Card/Card.tsx";

export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const SunIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="feather feather-sun">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
        )
    }
    const MoonIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="feather feather-moon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        )
    }

    return (
        <>
            <Card size={'sm'}>
                <label className={styles.toggleButton}
                       title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}>
                    <input
                        type="checkbox"
                        className={styles.toggleCheckbox}
                        onChange={toggleTheme}
                        checked={theme === 'light'} // dark = toggle is ON
                    />

                    <div className={`${styles.iconWrapper} ${styles.sun}`} >
                        <SunIcon />
                    </div>

                    <div className={`${styles.iconWrapper} ${styles.moon}`}>
                        <MoonIcon />
                    </div>
                </label>
            </Card>
        </>
    );
};
