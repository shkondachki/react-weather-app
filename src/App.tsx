import { useState } from "react";
import { motion } from "framer-motion";
import { fetchWeather, fetchForecast, WeatherData, ForecastItem } from "./api/weather";
import styles from "./App.module.css";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!city) return;

        try {
            const weatherData = await fetchWeather(city);
            setWeather(weatherData);

            const forecastData = await fetchForecast(city);
            setForecast(forecastData);

            setError("");
        } catch (err) {
            setError("City not found. Try again.");
            setWeather(null);
            setForecast([]);
        }
    };

    return (
        <div className={styles.app}>
            <h1>Weather App</h1>

            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {weather && (
                <motion.div
                    className={styles.currentWeather}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>{weather.city}</h2>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.description}
                    />
                    <p>{Math.round(weather.temperature)}°C</p>
                    <p>{weather.description}</p>
                </motion.div>
            )}

            {forecast.length > 0 && (
                <div className={styles.forecast}>
                    <h3>5-Day Forecast</h3>
                    <div className={styles.forecastGrid}>
                        {forecast.map((item, index) => (
                            <motion.div
                                key={item.date}
                                className={styles.forecastCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <p>{new Date(item.date).toLocaleDateString(undefined, { weekday: "short" })}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                    alt={item.description}
                                />
                                <p>{Math.round(item.temp)}°C</p>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
