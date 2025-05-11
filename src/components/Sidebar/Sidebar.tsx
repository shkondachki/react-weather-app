import styles from "./Sidebar.module.scss";
import {motion} from "framer-motion";
import {SearchLocation} from "../SearchLocation/SearchLocation.tsx";
import {WeatherData} from "../../api/weather.ts";
import {useContext} from "react";
import {DegreeUnitContext} from "../../context/DegreeUnitContext.tsx";
import { convertTemperature } from "../../utils/convertTemperature.tsx";

interface SidebarProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
    weather: WeatherData | null;
    error: string;
}
export const Sidebar = ( {
     city,
     setCity,
     handleSearch,
     weather,
     error
}: SidebarProps ) => {

    const { unit } = useContext(DegreeUnitContext);

    return (
        <div className={styles.sidebar}>
            <SearchLocation
                city={city}
                setCity={setCity}
                handleSearch={handleSearch}
                error={error}
            />

            {weather && (
                <motion.div
                    className={styles.currentWeather}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt={weather.description}
                    />
                    <h3 className={styles.currentTemp}>{Math.round(convertTemperature(weather.temperature, unit))}°</h3>
                    <h2 className={styles.city}>{weather.city}</h2>

                    <p className={styles.weatherDescription}>{weather.description}</p>
                </motion.div>
            )}
        </div>
    )
}