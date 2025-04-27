const API_KEY = "08517945ddd9ff3712c6cf7abd070513";
const BASE_URL = "https://api.openweathermap.org/data/2.5"; // Base API URL

// Type for current weather
export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    icon: string;
}

// Type for forecast weather item
export interface ForecastItem {
    date: string;
    temp: number;
    description: string;
    icon: string;
}

// Fetch current weather for a city
export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const res = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
    };
};

// Fetch 5-day forecast for a city
export const fetchForecast = async (city: string): Promise<ForecastItem[]> => {
    const res = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Forecast fetch failed");

    const data = await res.json();

    const dailyData: Record<string, ForecastItem> = {};

    // OpenWeatherMap gives 3-hour steps → pick 12:00 pm data for each day
    data.list.forEach((item: any) => {
        const [date, hour] = item.dt_txt.split(" ");
        if (hour === "12:00:00") {
            dailyData[date] = {
                date,
                temp: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
            };
        }
    });

    // Return only 5 days
    return Object.values(dailyData).slice(0, 5);
};
