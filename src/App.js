import React from "react";
import WeatherSearch from "./WeatherSearch";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Weather App</h1>
          <WeatherSearch />
        </div>
      </header>
    </div>
  );
}

export default App;
