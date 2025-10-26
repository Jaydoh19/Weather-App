const apiKey = "41baa5bca17db5f3f2a37f3f0a550723";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

const tempButton = document.querySelector('.tmpBtn');
const tempElement = document.querySelector(".temp");
const tempKmElement = document.querySelector(".wind");
const mphButton = document.querySelector(".mphBtn");

let isCelsius = true;
let isKmh = true;


tempButton.style.display = "none";
mphButton.style.display = "none";

let originalTempC = null;

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);

    if(response.status == 404) {
      document.querySelector('.error').style.display = "block";
    } else if (!city){
      document.querySelector('.error').style.display = "block";
    } else if (!isNaN(city)){
      document.querySelector('.error').style.display = "block";
    } else {
      var data = await response.json();
      originalTempC = data.main.temp;
      originalWindKmh = data.wind.speed;
    

      document.querySelector('.city').innerHTML = data.name;
      tempElement.textContent = `${originalTempC.toFixed(0)} °C`;
      document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
      originalWindSpeed = data.wind.speed;
      document.querySelector('.wind').innerHTML = originalWindSpeed.toFixed(1) + " km/h";

      if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector('.weather').style.display = "block";
      document.querySelector('.error').style.display = "none";
      document.querySelector('.tmpBtn').style.display = "block";
      document.querySelector('.mphBtn').style.display = "block";
    }

    isCelsius = true;
    isKmh = true;
    tempButton.textContent = "°F";
    mphButton.textContent = "mph";
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', (e) => {
  if(e.key == 'Enter') checkWeather(searchBox.value);
});

// =======================
// Temperature Conversion
// =======================


function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5)+ 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return  (fahrenheit - 32) * 5/9;
}

tempButton.addEventListener('click', () => {
  changeMetric();
})

function changeMetric() {
  // nothing to do until we have data
  if (originalTempC === null) return;

  if (isCelsius) {
    // convert original °C -> °F
    const f = celsiusToFahrenheit(originalTempC);
    tempElement.textContent = `${f.toFixed(0)} °F`;
    tempButton.textContent = "°C";
  } else {
    // show original °C
    tempElement.textContent = `${originalTempC.toFixed(0)} °C`;
    tempButton.textContent = "°F";
  }

  isCelsius = !isCelsius;
}

function updateWeather(data) {
  const celsiusTemp = data.main.temp;
  updateTemperature(celsiusTemp); // update the toggle's base temp
}

// =======================
// MPH Conversion
// =======================

mphButton.addEventListener('click', () => {
  if (originalWindKmh === null) return;

  if (isKmh) {
    const mph = kmhToMph(originalWindKmh);
    tempKmElement.textContent = `${mph.toFixed(1)} mph`;
    mphButton.textContent = "km/h";
  } else {
    tempKmElement.textContent = `${originalWindKmh.toFixed(1)} km/h`;
    mphButton.textContent = "mph";
  }

  isKmh = !isKmh;
});

function kmhToMph(kmh) {
  return kmh * 0.621371;
}

function mphToKmh(mph) {
  return mph * 1.60934;
}

