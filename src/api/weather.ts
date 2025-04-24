
const API_KEY = "08517945ddd9ff3712c6cf7abd070513";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    icon: string;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const res = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    console.log(data);
    return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
    }

}