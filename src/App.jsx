import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (e) => {
    e.preventDefault(); 
    setError(null);
    try {
      const apiKey = 'cec0c6efe515e6ee9375257469f52e32'; 
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);

      
      const temperatureCelsius = response.data.main.temp - 273.15;
      response.data.main.temp = temperatureCelsius.toFixed(2);
      setWeatherData(response.data);
    } catch (err) {
      setWeatherData(null);
      setError('Failed to fetch weather data');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-2">Weather App</h1>
      <form onSubmit={fetchWeatherData}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
      {weatherData && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{weatherData.name}</h3>
            <p className="card-text">Temperature: {weatherData.main.temp}°C</p>
            <p className="card-text">Weather: {weatherData.weather[0].description}</p>
            <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
            <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default App;
