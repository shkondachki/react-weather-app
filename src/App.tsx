import {useEffect, useState} from "react";
import { fetchWeather, fetchForecast, WeatherData, ForecastItem } from "./api/weather";
import styles from "./App.module.scss";
import {Sidebar} from "./components/Sidebar/Sidebar.tsx";
import {MainView} from "./components/MainView/MainView.tsx";
import classnames from "classnames";

function App() {
    const [city, setCity] = useState("Sofia");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        handleSearch(); // Fetch weather when the app is first loaded
    }, []); // Empty dependency array to run once on initial mount

    const handleSearch = async () => {
        if (!city.trim()) return; // Don't search if city is empty or just spaces

        setWeather(null);
        setForecast([]);

        try {
            const weatherData = await fetchWeather(city);
            setWeather(weatherData);

            const forecastData = await fetchForecast(city);
            setForecast(forecastData);

            setError("");
        }
        catch (err) {
            console.error(err);
            setError("City not found. Try again.");
            setWeather(null);
            setForecast([]);
        }
    };

    return (
        <div className={classnames(styles.app)}>

                <Sidebar
                    city={city}
                    setCity={setCity}
                    handleSearch={handleSearch}
                    weather={weather}
                    error={error}
                />

                <MainView
                    forecast={forecast}
                    weather={weather}
                />

        </div>
    );
}

export default App;
