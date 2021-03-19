function formatDate(timestamp) {
let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
  
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML = null;
 let forecast = null;

 for (let index = 0; index < 6; index++) {
   forecast= response.data.list[index];
   forecastElement.innerHTML += `
  <div class = "col-2">
    <h5>
      ${formatHours(forecast.dt * 1000)}
    </h5>
   <img
   src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
   />
  <div class="weather-forecast-temperature">
    <strong>
      ${Math.round(forecast.main.temp_max)}°
    </strong>
       ${Math.round(forecast.main.temp_min)}°
  </div>
</div>
   `;
 }
}

function searchCity(city){
let apiKey = "d714b403e950ff68e3e4666fcfff93ae";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}

searchCity("Seattle");

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  farenheitTemperature = response.data.main.temp;
  let currentTemp = Math.round(farenheitTemperature);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${currentTemp}`;
  let city = response.data.name;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = city;
  let description = document.querySelector("#weather-descriptor");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#big-icon");
  iconElement.setAttribute("src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  
  let h3 = document.querySelector("h3"); 
  h3.innerHTML = formatDate(response.data.dt * 1000);
}


function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "d714b403e950ff68e3e4666fcfff93ae";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let geolocationUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(geolocationUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
 
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

function showCelsiusTemperature(event){
event.preventDefault();
farenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
let celsiusTemperature = (farenheitTemperature - 32) / 1.8;
let temperatureElement = document.querySelector("#temperature");

temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}


let farenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFahrenheitTemperature);

