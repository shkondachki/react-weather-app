import styles from "./MainView.module.scss";
import cardStyles from "../Card/Card.module.scss";
import {motion} from "framer-motion";
import {ForecastItem, WeatherData} from "../../api/weather.ts";
import {Card} from "../Card/Card.tsx";

interface MainViewProps {
    forecast: ForecastItem[];
    weather: WeatherData | null;
}
export const MainView = ({ forecast, weather }: MainViewProps) => {

    const sunriseTime =
        weather && new Date(weather.sunrise * 1000).toLocaleTimeString([],
            { hour: '2-digit', minute: '2-digit' });
    const sunsetTime =
        weather && new Date(weather.sunset * 1000).toLocaleTimeString([],
            { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.main}>
            {forecast.length > 0 && (
                <>
                    <div className={styles.topNav}>
                        <h2 className={styles.city}>{weather?.city}</h2>
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
                                    size={'sm'}
                                >
                                    <h4 className={cardStyles.city}></h4>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                        alt={item.description}
                                    />
                                    <h5 className={cardStyles.temps}>
                                        <span className={cardStyles.tempMax}>{Math.round(item.tempMax)}°C</span>
                                        <span className={cardStyles.tempMin}>{Math.round(item.tempMin)}°C</span></h5>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}


            {weather && (
                <div className={styles.highlights}>
                    <h3 className={styles.cardsTitle}>Today's highlights</h3>

                    <div className={styles.cards}>
                        <Card title={'Feels Like'} size={'lg'}>
                            <h4>{weather.feelsLike}</h4>
                        </Card>

                        <Card title={'Humidity'} size={'lg'}>
                            <h4> {weather.humidity}<small>%</small></h4>
                        </Card>

                        <Card title={'Min & Max'} size={'lg'}>
                            <h4>{weather.tempMin} / {weather.tempMax}</h4>
                        </Card>

                        <Card title={'Sunrise & Sunset'} size={'lg'}>
                            <h4>{sunriseTime} / {sunsetTime}</h4>
                        </Card>

                        <Card title={'Visibility'} size={'lg'}>
                            <h4>{weather.visibility}</h4>
                        </Card>

                        <Card title={'Wind Speed'} size={'lg'}>
                            <h4>{weather.windSpeed} <small>km/h</small></h4>
                        </Card>
                    </div>
                </div>

            )}
        </div>
    )
}