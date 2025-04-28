import styles from "./Sidebar.module.scss";
import {motion} from "framer-motion";
import {SearchLocation} from "./SearchLocation.tsx";
import {WeatherData} from "../api/weather.ts";

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
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.description}
                    />
                    <h3 className={styles.currentTemp}>{Math.round(weather.temperature)}°C</h3>
                    <h2 className={styles.city}>{weather.city}</h2>

                    <p className={styles.weatherDescription}>{weather.description}</p>
                </motion.div>
            )}
        </div>
    )
}