import React from 'react'
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="card">
        <h2 className="title"><i className="fa fa-cloud"></i>Weather App</h2>
          <div className="search-form">
              <input type="text" placeholder="Enter your city name"/>
              <button type="button">Search</button>
          </div>

      </div>
    </div>
  );
}

export default App;
