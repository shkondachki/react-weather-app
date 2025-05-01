import { useEffect, useRef, useState } from "react";
import { fetchWeather, fetchForecast, WeatherData, ForecastItem } from "./api/weather";
import styles from "./App.module.scss";
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";
import { MainView } from "./components/MainView/MainView.tsx";
import classnames from "classnames";

const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutes

function App() {
    const [city, setCity] = useState("Sofia");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [error, setError] = useState("");
    const [lastValidCity, setLastValidCity] = useState("Sofia");
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    const [dataVersion, setDataVersion] = useState(0); // for framer animation trigger

    const cache = useRef<Map<
        string,
        {
            weather: WeatherData;
            forecast: ForecastItem[];
            timestamp: number;
        }
    >>(new Map());

    useEffect(() => {
        handleSearch(true); // Initial load
    }, []);

    // Change the title of the browser tab with current weather
    useEffect(() => {
        if (weather?.temperature && weather?.city) {
            const capitalizedCity = weather.city.charAt(0).toUpperCase() + weather.city.slice(1);
            document.title = `${Math.round(weather.temperature)}° in ${capitalizedCity} - Weather App with React`;
        }
    }, [weather?.temperature, weather?.city]);


    const handleSearch = async (isInitialLoad = false): Promise<void> => {
        const trimmedCity = city.trim().toLowerCase();

        // If no value typed
        if (!trimmedCity) {
            setError("Please enter a city.");
            return;
        }

        // Same value typed
        if (!isInitialLoad && trimmedCity === lastValidCity.toLowerCase()) {
            setError("You're already viewing this city.");
            return;
        }

        const now = Date.now();
        const cached = cache.current.get(trimmedCity);

        if (cached && now - cached.timestamp < CACHE_EXPIRATION_MS) {
            setWeather(cached.weather);
            setForecast(cached.forecast);
            setLastValidCity(trimmedCity);
            setError("");
            setHasLoadedOnce(true);
            setDataVersion(prev => prev + 1);
            return;
        }

        try {
            setError("");
            setWeather(null);
            setForecast([]);

            const weatherData = await fetchWeather(trimmedCity);
            const forecastData = await fetchForecast(trimmedCity);

            cache.current.set(trimmedCity, {
                weather: weatherData,
                forecast: forecastData,
                timestamp: now,
            });

            setWeather(weatherData);
            setForecast(forecastData);
            setLastValidCity(trimmedCity);
            setHasLoadedOnce(true);
            setDataVersion(prev => prev + 1);
        }

        catch (err) {
            console.error(err);
            setError("City not found. Try again.");

            if (isInitialLoad || hasLoadedOnce) {
                try {
                    const fallbackCity = lastValidCity.toLowerCase();
                    const fallbackCached = cache.current.get(fallbackCity);

                    if (fallbackCached && now - fallbackCached.timestamp < CACHE_EXPIRATION_MS) {
                        setWeather(fallbackCached.weather);
                        setForecast(fallbackCached.forecast);
                        setDataVersion(prev => prev + 1);
                    } else {
                        const weatherData = await fetchWeather(fallbackCity);
                        const forecastData = await fetchForecast(fallbackCity);
                        cache.current.set(fallbackCity, {
                            weather: weatherData,
                            forecast: forecastData,
                            timestamp: now,
                        });
                        setWeather(weatherData);
                        setForecast(forecastData);
                        setDataVersion(prev => prev + 1);
                    }
                } catch (fallbackErr) {
                    console.error("Failed to load fallback data", fallbackErr);
                    setError("Something went wrong. Please try again later.");
                }
            }
        }
    };



    return (
        <div className={classnames(styles.app)}>
            <Sidebar
                city={city}
                setCity={setCity}
                handleSearch={() => handleSearch(false)}
                weather={weather}
                error={error}
            />
            <MainView
                forecast={forecast}
                weather={weather}
                dataVersion={dataVersion}
            />
        </div>
    );
}

export default App;
