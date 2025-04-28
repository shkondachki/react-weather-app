const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5"; // Base API URL

// Type for current weather
export interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    description: string;
    icon: string;
    feelsLike: number;
    humidity: number;
    clouds: number;
    sunrise: number;
    sunset: number;
    visibility: number;
    windSpeed: number
}

// Type for forecast weather item
export interface ForecastItem {
    date: string;
    temp: number;
    description: string;
    icon: string;
    tempMin: number;
    tempMax: number;
}

// Fetch current weather for a city
export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const res = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    console.log(data);

    return {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        clouds: data.clouds.all,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        visibility: data.visibility,
        windSpeed: data.wind.speed
    };
};

// Fetch 5-day forecast for a city
export const fetchForecast = async (city: string): Promise<ForecastItem[]> => {
    const res = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Forecast fetch failed");

    const data = await res.json();

    // OpenWeatherMap gives 3-hour steps → pick 12:00 pm data for each day
    const dailyData: { [date: string]: any } = {};

    data.list.forEach((item: any) => {
        const [date, hour] = item.dt_txt.split(" ");

        if (!dailyData[date]) {
            dailyData[date] = {
                date,
                tempMin: item.main.temp_min,
                tempMax: item.main.temp_max,
                temp: item.main.temp, // We'll override it later with 12:00 if available
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                hasNoonData: hour === "12:00:00",
            };
        } else {
            // Update min and max
            dailyData[date].tempMin = Math.min(dailyData[date].tempMin, item.main.temp_min);
            dailyData[date].tempMax = Math.max(dailyData[date].tempMax, item.main.temp_max);

            // Prefer the 12:00 data for display (nice middle of the day snapshot)
            if (hour === "12:00:00") {
                dailyData[date].temp = item.main.temp;
                dailyData[date].description = item.weather[0].description;
                dailyData[date].icon = item.weather[0].icon;
                dailyData[date].hasNoonData = true;
            }
        }
    });


    // Return only 5 days
    return Object.values(dailyData).slice(0, 5);
};
