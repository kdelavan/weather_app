let now = new Date();

let h3 = document.querySelector("h3");

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday,",
  "Friday",
  "Saturday"
];
let day = daysOfWeek[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();

h3.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(city){
 let apiKey = "d714b403e950ff68e3e4666fcfff93ae";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showTemperature);
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

}


function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "d714b403e950ff68e3e4666fcfff93ae";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"
  let geolocationUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(geolocationUrl).then(showTemperature);
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