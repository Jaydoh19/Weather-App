const apiKey = "41baa5bca17db5f3f2a37f3f0a550723";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const tempButton = document.querySelector('.tmpBtn');
const tempElement = document.querySelector(".temp");

let isCelsius = true;

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

    

      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
      document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

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
    }
    
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
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

function changeMetric(){
 
    let tempText = tempElement.textContent;
    let currentTemp = parseFloat(tempText);

    if (isCelsius) {
      const fahrenheit = celsiusToFahrenheit(currentTemp);
      tempElement.textContent = `${Math.round(fahrenheit)} °F`
      tempButton.textContent = "°C";
    } else {
      const celsius = fahrenheitToCelsius(currentTemp);
      tempElement.textContent = `${Math.round(celsius)} °C`
      tempButton.textContent = "°F";
    }

    isCelsius = !isCelsius;
}

function updateWeather(data) {
  const celsiusTemp = data.main.temp;
  updateTemperature(celsiusTemp); // update the toggle's base temp
}