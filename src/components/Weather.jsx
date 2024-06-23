import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      toast.error("Please enter the city name");
      return;
    }
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(URL);
      const data = await response.json();

      if (!response.ok) {
        toast.error("City not found");
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data.");
    }
  };

  useEffect(() => {
    search("Pokhara");
  }, []);

  return (
    <>
      <div className="title">
        <h1>Weather App</h1>
      </div>
      <div className="weather">
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Search" />
          <img
            src={search_icon}
            alt=""
            onClick={() => search(inputRef.current.value)}
          />
        </div>

        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="" className="weatherIcon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>

            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} />
                <div>
                  <p>{weatherData.humidity}</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className="col">
                <img src={wind_icon} />
                <div>
                  <p>3{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <ToastContainer autoClose={1500} />
      </div>

      <h3 className="footerText">Made with ❤️ by <a href="https://www.facebook.com/profile.php?id=100075293577033" target="_main">Ajay Dhakal</a></h3>

    </>
  );
};

export default Weather;
