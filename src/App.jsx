import React, { useState } from 'react';
import './App.css'; // Make sure to import your CSS file

const WeatherApp = () => {
  const [theme,settheme]=useState('bright')
  const [city, setCity] = useState('Hyderabad');
  const [weatherData, setWeatherData] = useState(null);
  
  const getWeather = () => {
    if (city.length === 0) {
      setWeatherData(<h3 className="msg">Please enter a city name</h3>);
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf266ec499f78c9c77ceab370f7faa8b&units=metric`;
      setCity('');
      
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.dt<data.sys["sunset"] && data.dt>data.sys["sunrise"] ){
            settheme('bright')
          }
          else{
            settheme('dark')
          }
          setWeatherData(
            <div>
              <h2>{data.name}</h2>
              
              <h2 >({data.coord["lon"]},{data.coord["lat"]})</h2>
              <h4 className="weather">{data.weather[0].main}</h4>
              {/* <h4 className="desc">{data.weather[0].description}</h4> */}
              <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon" />
              <h1>{data.main.temp} &#176;</h1>
              <div className="temp-container">
                <div>
                  <h4 className="title">min</h4>
                  <h4 className="temp">{data.main.temp_min}&#176;c</h4>
                </div>
                <div>
                  <h4 className="title">max</h4>
                  <h4 className="temp">{data.main.temp_max}&#176;c</h4>
                </div>
              </div>
              
              <div className='temp-container'>
                <div>
                  <h4 className="title">Pressure</h4>
                  <h4 className="temp">{data.main.pressure} hPa</h4>
                </div>
                <div>
                  <h4 className="title">Humidity</h4>
                  <h4 className="temp">{data.main.humidity}</h4>
                </div>
                <div>
                  <h4 className="title">Wind Speed</h4>
                  <h4 className="temp">{data.wind["speed"]}</h4>
                </div>
              </div>
            </div>
          );
        })
        .catch(() => {
          fetch(`https://www.stands4.com/services/v2/grammar.php?uid=12187&tokenid=yqFWz075iEFkvHgS&text=${city}&format=json`)
          .then((resp) => resp.json())
          .then((data) => {
            var t=data.matches[0].replacements[0].value
            setCity(t);
            setWeatherData(<>
              <h3 className="msg" >try: {t}</h3>
              <h3 className="msg">City not found</h3>    
              </> 
              );
            })
          .catch(()=>{
            setWeatherData(<>
              <h3 className="msg">City not found</h3>    
              </> )
          })
        });
    }
  };

  return (
    <div className={theme}>
    <div className='wrapper'>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>
        <div id="result">{weatherData}</div>
      </div>
      {/* <div>
        <button onClick={toggl}>pppp</button>
      </div> */}
    </div>
    </div>
  );
};

export default WeatherApp;