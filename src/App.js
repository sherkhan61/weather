import React, {useState, useEffect} from 'react'
import {getWeatherData} from './api/weatherApi'
import './App.scss';




function App() {
    const [weatherData, setWeatherData] = useState(null)
    const [city, setCity] = useState('Nur-Sultan')
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            const data = await getWeatherData(city)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div className="App">
      <div className="card">
        <h2 className="title"><i className="fa fa-cloud"></i>Weather App</h2>
          <div className="search-form">
              <input type="text" onChange={(e) => setCity(e.target.value)} placeholder="Enter your city name"/>
              <button type="button" onClick={() => getData()}>Search</button>
          </div>
          <div className="main-container">
              <h4>Live Weather Condition</h4>
              <div className="weather-icon">
                  <i className="fa fa-sun"></i>
              </div>
              <h3>Sunny</h3>
              <div className="temperature">
                  <h1>25&deg;C</h1>
              </div>
              <div className="location">
                  <h3><i className="fa fa-street-view"></i>Nur-Sultan | Kazakhstan</h3>
              </div>
              <div className="temperature-range">
                  <h6>Min: 25&deg;C || Max: 28&deg;C || Humidity: 10%</h6>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
