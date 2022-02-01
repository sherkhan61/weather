function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day}, ${hour}:${minute}`;
}

let today = document.querySelector(".today");
today.innerHTML = formatDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// Display Forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="images/${forecastDay.weather[0].icon}.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// Pull forecast data

function getForecast(coordinates) {
  let apiKey = "11d998cbbca6bedaa384d917305d3b9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// Search City
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let city = `${searchInput.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  info(city);
}
// Api info
function info(city) {
  let apiKey = "11d998cbbca6bedaa384d917305d3b9a";

  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateApp);
}

// Display all info
function updateApp(response) {
  celsiusTemperature = response.data.main.temp;

  let city = response.data.name;
  let cityUpdate = document.querySelector("h1");
  cityUpdate.innerHTML = `${city}`;
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp-today");
  temperature.innerHTML = `${currentTemperature}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let currentDescription = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${currentDescription}`;

  let highTemperature = Math.round(response.data.main.temp_max);
  let lowTemperature = Math.round(response.data.main.temp_min);
  let highLowDisplay = document.querySelector("#min-max");
  highLowDisplay.innerHTML = `Max - Min: ${highTemperature}°C / ${lowTemperature}°C`;

  let currentRealFeel = Math.round(response.data.main.feels_like);
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = `Real Feel: ${currentRealFeel}°C`;

  let currentWind = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${currentWind} mph`;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  getForecast(response.data.coord);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "11d998cbbca6bedaa384d917305d3b9a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateApp);
}

let geolocationButton = document.querySelector("#find");
geolocationButton.addEventListener("click", getCurrentLocation);

// Change from Celcius to Farhenreit and vice versa
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsius.classList.remove("active");
  fahr.classList.add("active");
  let temperatureElement = document.querySelector("#temp-today");
  let farhTemp = Math.round(fahrenheitTemperature);
  temperatureElement.innerHTML = `${farhTemp}°F`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-today");
  celsius.classList.add("active");
  fahr.classList.remove("active");
  let celsiusTemp = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${celsiusTemp}°C`;
}

let celsiusTemperature = null;

let celsius = document.querySelector("#celcius");
celsius.addEventListener("click", showCelsius);
let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", showFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
info("Nur-Sultan");
