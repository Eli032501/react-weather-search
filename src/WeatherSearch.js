import React, { useState } from "react";
import axios from "axios";
import "./WeatherSearch.css";

export default function WeatherSearch() {
  let [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});
  const displayDate = getDate();

  function getDate() {
    const today = new Date();
    const day = today.getDay();
    const currentMonth = today.getMonth();
    const date = today.getDate();

    let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekDay = week[day];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let thisMonth = months[currentMonth];
    return `${weekDay}, ${date} ${thisMonth} `;
  }

  function cityWeather(response) {
    setLoaded(true);
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = `5863935ee9cca4c02ed68203f807c65b`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(cityWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        className="input-bar"
        type="text"
        placeholder=" Type a city"
        onChange={updateCity}
      />
      <input className="input-button" type="submit" value="Search" />
    </form>
  );
  let footer = (
    <p className="footer-text">
      This project was coded by{" "}
      <a href="https://github.com/Eli032501" target="_blank" rel="noreferrer">
        Eliana Pereira
      </a>{" "}
      and is on{" "}
      <a
        href="https://github.com/Eli032501/react-weather-search"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>{" "}
      and hosted on{" "}
      <a
        href="https://weather-search-react-shecodes-hw.netlify.app/"
        target="_blank"
        rel="noreferrer"
      >
        Netlify
      </a>
    </p>
  );

  if (loaded) {
    return (
      <div className="WeatherSearch">
        <div className="box">
          {form}
          <div className="display-weather">
            <span>
              <h2>{weather.city}</h2>
              <h3>{displayDate} </h3>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind: {Math.round(weather.wind)}km/h</p>
              <p>Sky: {weather.description}</p>
            </span>
            <span className="temp-display">
              <span className="temp-value">
                {Math.round(weather.temperature)}
                <span>°C</span>
              </span>
              <figure>
                <img src={weather.icon} alt={weather.description} />
              </figure>
            </span>
          </div>
        </div>
        {footer}
      </div>
    );
  } else {
    return (
      <div className="WeatherSearch">
        <div className="box">
          {form}
          <h3> Waiting input to display weather... </h3>
        </div>

        {footer}
      </div>
    );
  }
}
