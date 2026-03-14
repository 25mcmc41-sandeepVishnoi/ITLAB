import React, { useState, useEffect } from "react";

function Weather() {

  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "9b0862d5e75ffd1d0c02e1035f538ffe";

  const getWeather = async () => {

    try {

      setError("");

      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=metric"
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);

      const res2 = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=metric"
      );

      const data2 = await res2.json();
      setForecast(data2.list.slice(0,5));

    } catch (err) {
      setError("something went wrong or city name is not correct");
      setWeather(null);
      setForecast([]);
    }

  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="box">

      <h2>Weather App</h2>

      <input
        type="text"
        placeholder="enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {error && <p style={{color:"red"}}>{error}</p>}

      {weather && (
        <div className="weatherInfo">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecastBox">
  <h3>5 Step Forecast</h3>

  {forecast.map((f,index)=>(
    <div className="forecastItem" key={index}>
      <p>{f.dt_txt}</p>
      <p>Temp: {f.main.temp} °C</p>
      <p>{f.weather[0].main}</p>
    </div>
  ))}

</div>
      )}

    </div>
  );
}

export default Weather;