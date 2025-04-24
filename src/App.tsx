import { useState } from 'react';
import './App.css'
import { fetchWeather } from './api/weather';

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<any>(null);

    const handleSearch = async (city: string) => {
        const data = await fetchWeather(city);
        setWeather(data);
    }

    console.log(weather);

    return (
      <>
        <div className="searchWrapper">
            <input
                type="text"
                placeholder="Location..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" onClick={() => {handleSearch(city)}}>Search</button>
        </div>

          {weather && (
              <>
                  <h2>{weather.city}</h2>
                  <h3>{weather.temperature}</h3>
                  <h4>{weather.description}</h4>
                  <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.description}
                  />
              </>

          )}
      </>
  )
}

export default App
