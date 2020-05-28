window.addEventListener('load', function() {
  loadWeather()
  document.getElementById('zipCodeSubmit').onclick = getWeatherByZip;
})

function getWeatherByZip() {
  const zipCode = document.getElementById('zipCodeInput').value;
  const fiveDigits = /^\d{5}$/;
  if(fiveDigits.test(zipCode)) {
    loadWeather(zipCode)
  }
}

function loadWeather(zipCode = 11221) {
  const key = 'a6a2cec7737de68bac44ec6349002f5b';
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${key}`;

  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      const payload = JSON.parse(this.responseText);
      const tempInF = Math.round(payload.main.temp);
      const weatherIconCode = payload.weather[0].icon;
      displayTemperature(tempInF);
      displayWeatherIcon(weatherIconCode);
    };
  };

  xhttp.open('GET', url, true);
  xhttp.send();
}

function displayTemperature(weather) {
  document.getElementById('weather').innerHTML = weather;
};

function displayWeatherIcon(weatherIconCode) {
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
  const weatherIconImage = document.getElementById('weatherIcon'); 
  weatherIconImage.src = weatherIconUrl;
}