import { useContext } from 'react';
import styles from "./UnitToggleButton.module.scss";
import {Card} from "../Card/Card.tsx";
import {DegreeUnitContext} from "../../context/DegreeUnitContext.tsx";

export const UnitToggleButton = () => {
    const { unit, toggleUnit } = useContext(DegreeUnitContext);


    return (
        <>
            <Card size={'sm'}>
                <label className={styles.toggleButton}
                       title={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}>
                    <input
                        type="checkbox"
                        className={styles.toggleCheckbox}
                        onChange={toggleUnit}
                        checked={unit === 'celsius'} // dark = toggle is ON
                    />

                    <div className={`${styles.iconWrapper} ${styles.initial}`} >
                        F°
                    </div>

                    <div className={`${styles.iconWrapper} ${styles.secondary}`}>
                        C°
                    </div>
                </label>
            </Card>
        </>
    );
};
