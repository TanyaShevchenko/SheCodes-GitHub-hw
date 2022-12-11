/* CALENDAR */
let date = document.querySelector(".title");

let calendar = new Date();
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
  "December"
];
let month = months[calendar.getMonth()];
let day = calendar.getDate();

let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayOfWeek = daysOfWeek[calendar.getDay()];
let year = calendar.getFullYear();

date.innerHTML = `${month} ${day} (${dayOfWeek}) / ${year}`;

let time = document.querySelector(".time_zone");
let hours = calendar.getHours();
let minutes = calendar.getMinutes();

if (minutes < 10) {
  time.innerHTML = `${hours}:0${minutes}`;
} else {
  time.innerHTML = `${hours}:${minutes}`;
}

/* CITY and FORECAST*/
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();

  let apiKey = "1b8b7a6e1460e6a06ebcf062726df01d";
  let location = document.querySelector("#search-bar-1").value;
  let http = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${http}?q=${location}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentForecast);
}

function getCurrentForecast(response) {
  let city = document.querySelector("#city-1");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector(".temperature-num");
  let currentTemperature = Math.round(response.data.main.temp);

  if (currentTemperature > 0) {
    temperature.innerHTML = `+ ${currentTemperature}`;
  } else {
    temperature.innerHTML = currentTemperature;
  }

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let weatherDetails = document.querySelector(".weather-details");
  weatherDetails.innerHTML = response.data.weather[0].main;

  let weatherIcon = document.querySelector(".temperature-icon");
  weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  celsiusTemperature = Math.round(response.data.main.temp);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1b8b7a6e1460e6a06ebcf062726df01d";
  let http = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${http}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentForecast);
}
navigator.geolocation.getCurrentPosition(handlePosition);

let currentLocation = document.querySelector(".currentCity-button");
currentLocation.addEventListener("click", myLocationWeather);

function myLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature-num");
  
  //change the active class
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = Math.round((celsiusTemperature * 9 )/ 5 + 32);
  
  temperatureElement.innerHTML = fahrenheitTemperature;
  
  if (fahrenheitTemperature > 0) {
    temperatureElement.innerHTML = `+ ${fahrenheitTemperature}`;
  } else {
    temperatureElement.innerHTML = fahrenheitTemperature;
  }

}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature-num");
  
  //change the active class
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = celsiusTemperature;

  if (celsiusTemperature > 0) {
    temperatureElement.innerHTML = `+ ${celsiusTemperature}`;
  } else {
    temperatureElement.innerHTML = celsiusTemperature;
  }
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celsius");
celciusLink.addEventListener("click", showCelsiusTemperature);