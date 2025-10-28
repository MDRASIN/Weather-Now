import React, { useState } from "react";
import "./style.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://api.open-meteo.com/v1/forecast";

  const getCoordinates = async (cityName) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name, country } = data.results[0];
      return { latitude, longitude, name, country };
    } else {
      throw new Error("City not found");
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }
    try {
      setLoading(true);
      const coords = await getCoordinates(city);
      const response = await fetch(
        `${API_BASE}?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weathercode,wind_speed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await response.json();
      setWeatherData({
        city: coords.name,
        country: coords.country,
        temp: data.current.temperature_2m,
        wind: data.current.wind_speed_10m,
        code: data.current.weathercode,
      });
      const days = data.daily.time.slice(0, 5).map((date, index) => ({
        date,
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index],
        code: data.daily.weathercode[index],
      }));
      setForecastData(days);
    } catch (error) {
      alert("Could not fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherCondition = (code) => {
    const mapping = {
      0: "☀️ Clear Sky",
      1: "🌤️ Mainly Clear",
      2: "⛅ Partly Cloudy",
      3: "☁️ Overcast",
      45: "🌫️ Foggy",
      48: "🌫️ Depositing Rime Fog",
      51: "🌦️ Light Drizzle",
      53: "🌧️ Moderate Drizzle",
      55: "🌧️ Dense Drizzle",
      61: "🌧️ Light Rain",
      63: "🌧️ Moderate Rain",
      65: "🌧️ Heavy Rain",
      71: "❄️ Light Snow",
      73: "❄️ Moderate Snow",
      75: "❄️ Heavy Snow",
      95: "⛈️ Thunderstorm",
      96: "⛈️ Thunderstorm with Hail",
      99: "🌩️ Severe Thunderstorm",
    };
    return mapping[code] || "🌈 Unknown";
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🌦️ Weather Monitor</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <button onClick={fetchWeather}>
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {weatherData && (
          <div className="weather-info">
            <h2>
              {weatherData.city}, {weatherData.country}
            </h2>
            <p>🌡️ Temperature: {weatherData.temp} °C</p>
            <p>🌬️ Wind Speed: {weatherData.wind} m/s</p>
            <p>☁️ Condition: {getWeatherCondition(weatherData.code)}</p>
          </div>
        )}

        {forecastData.length > 0 && (
          <>
            <h3>5-Day Forecast</h3>
            <div id="forecast">
              {forecastData.map((day, index) => (
                <div className="forecast-card" key={index}>
                  <h4>{new Date(day.date).toDateString()}</h4>
                  <p>{getWeatherCondition(day.code)}</p>
                  <p>🌡️ {day.min}°C - {day.max}°C</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
