import styles from "./MainView.module.scss";
import cardStyles from "../Card/Card.module.scss";
import { motion } from "framer-motion";
import { ForecastItem, WeatherData } from "../../api/weather.ts";
import { Card } from "../Card/Card.tsx";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";
import Flag from "react-world-flags";

interface MainViewProps {
    forecast: ForecastItem[];
    weather: WeatherData | null;
}

export const MainView = ({ forecast, weather }: MainViewProps) => {
    if (!weather) return null;

    // Country Flag
    const CountryFlag = ({ countryCode }: { countryCode: string }) => {
        return <Flag code={countryCode} alt={countryCode} title={countryCode} />;
    };

    // Format time for Sunset & sunrise
    const sunriseTime = new Date(weather.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const sunsetTime = new Date(weather.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Clouds description based on number %
    const getCloudDescription = (clouds: number): string => {
        if (clouds <= 25) return "Clear";
        if (clouds <= 50) return "Partly Cloudy";
        if (clouds <= 75) return "Mostly Cloudy";
        return "Overcast";
    };

    // Highlights
    const highlights = [
        { title: "Feels Like",  value: <>{Math.round(weather.feelsLike)}°</> },
        { title: "Humidity",    value: <>{weather.humidity}<small>%</small></> },
        { title: "Clouds",      value: <>{getCloudDescription(weather.clouds)}</> , className: 'clouds'},
        { title: "Visibility",  value: <>{weather.visibility}<small>m</small></> },
        { title: "Wind Speed",  value: <>{weather.windSpeed}<small>km/h</small></> },
    ];

    return (
        <div className={styles.main}>
            <div className={styles.inner}>
                {forecast.length > 0 && (
                    <>
                        <div className={styles.topNav}>
                            <h2 className={styles.city}><CountryFlag countryCode={weather.country} /> {weather.city} </h2>
                            <div className={styles.symbol}>°C</div>
                        </div>

                        <h3 className={styles.cardsTitle}>5-Day Forecast</h3>

                        <div className={styles.forecastGrid}>
                            {forecast.map((item, index) => (
                                <motion.div
                                    key={item.date}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        title={new Date(item.date).toLocaleDateString(undefined, { weekday: "short" })}
                                        size="sm"
                                    >
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                            alt={item.description}
                                        />
                                        <h5 className={cardStyles.temps}>
                                            <span className={cardStyles.tempMax}>
                                              {Math.round(item.tempMax)}°
                                            </span>
                                            <span className={cardStyles.tempMin}>
                                              {Math.round(item.tempMin)}°
                                            </span>
                                        </h5>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                <div className={styles.highlights}>
                    <h3 className={styles.cardsTitle}>Today's highlights</h3>

                    <div className={styles.cards}>
                        {highlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card key={item.title} title={item.title} size="lg" className={item.className}>
                                    <h4>{item.value}</h4>
                                </Card>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 5 * 0.1 }}
                        >
                            <Card title="Sunrise & Sunset" size="lg" className="sunsetSunrise">
                                <div className={cardStyles.inner}>
                                    <img src={arrowUp} alt="Sunrise" />
                                    <span>{sunriseTime}</span>
                                </div>
                                <div className={cardStyles.inner}>
                                    <img src={arrowDown} alt="Sunset" />
                                    <span>{sunsetTime}</span>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
