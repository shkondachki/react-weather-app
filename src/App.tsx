import { useEffect, useRef, useState } from "react";
import { fetchWeather, fetchForecast, WeatherData, ForecastItem } from "./api/weather";
import styles from "./App.module.scss";
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";
import { MainView } from "./components/MainView/MainView.tsx";
import classnames from "classnames";

function App() {
    const [city, setCity] = useState("Sofia");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [error, setError] = useState("");
    const [lastValidCity, setLastValidCity] = useState("Sofia");
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    const [dataVersion, setDataVersion] = useState(0); // used for framer animation when a cached version is loaded


    const cache = useRef<Map<string, { weather: WeatherData; forecast: ForecastItem[] }>>(new Map());

    useEffect(() => {
        handleSearch(true); // Initial load
    }, []);

    const handleSearch = async (isInitialLoad = false): Promise<void> => {
        const trimmedCity = city.trim().toLowerCase();

        if (!trimmedCity) {
            setError("Please enter a city.");
            return;
        }

        if (!isInitialLoad && trimmedCity === lastValidCity.toLowerCase()) {
            setError("You're already viewing this city.");
            return;
        }

        // ✅ Check cache first
        if (cache.current.has(trimmedCity)) {
            const cached = cache.current.get(trimmedCity)!;
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

            // ✅ Store in cache
            cache.current.set(trimmedCity, { weather: weatherData, forecast: forecastData });

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

                    if (cache.current.has(fallbackCity)) {
                        const cached = cache.current.get(fallbackCity)!;
                        setWeather(cached.weather);
                        setForecast(cached.forecast);
                        setDataVersion(prev => prev + 1);
                    }
                    else {
                        const weatherData = await fetchWeather(fallbackCity);
                        const forecastData = await fetchForecast(fallbackCity);
                        cache.current.set(fallbackCity, { weather: weatherData, forecast: forecastData });
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
