window.addEventListener('load', function() {
  loadWeather();
  toggleScale();
  document.getElementById('zipCodeSubmit').onclick = getWeatherByZip;
})

function getWeatherByZip() {
  const zipCode = document.getElementById('zipCodeInput').value;
  const fiveDigitsRegEx = /^\d{5}$/;
  if(fiveDigitsRegEx.test(zipCode)) {
    loadWeather(zipCode)
  }
}

function loadWeather(zipCode = 11221) {
  const key = 'a6a2cec7737de68bac44ec6349002f5b';
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${key}`;

  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      const tempScale = document.getElementById('tempScale').innerHTML;
      const payload = JSON.parse(this.responseText);
      const temperature = Math.round(payload.main.temp);

      const converted = convertTemperature('Fahrenheit', temperature)
      console.log('Converted:', converted)

      const weatherIconCode = payload.weather[0].icon;
      // displayTemperature(temperature);
      displayWeatherIcon(weatherIconCode);
    };
  };

  xhttp.open('GET', url, true);
  xhttp.send();
};

function displayTemperature(weather) {
  document.getElementById('weather').innerHTML = weather;
};

function displayWeatherIcon(weatherIconCode) {
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
  const weatherIconImage = document.getElementById('weatherIcon'); 
  weatherIconImage.src = weatherIconUrl;
};

function toggleScale() {
  let scale = document.getElementById('tempScale');
  let currentTemp = document.getElementById('weather').innerHTML;
  
  scale.onclick = function() {
    if(scale.innerHTML === 'Fahrenheit') {
      scale.innerHTML = 'Celsius';
    }
    else {
      scale.innerHTML = 'Fahrenheit';
    };
    convertTemperature(scale.innerHTML, currentTemp);
  };
};

function convertTemperature(scale, temp = 77) {
  // scale: 'F', temp: 80
  const currentScale = document.getElementById('tempScale').innerHTML;
  const currentTemp = document.getElementById('weather');


  const conversions = {
    'Celsius': Math.round((temp - 32) * 5/9),
    'Fahrenheit': Math.round((temp * 9/5) + 32) 
  };
// if scale pulled from the DOM !== scale passed in
  // convert the temp passed in to the scale that is on the DOM

  // currentTemp.innerHTML = conversions[currentScale];

  console.log(currentScale, scale)
  if(scale !== currentScale) {
    console.log(currentTemp.innerHTML)
    currentTemp.innerHTML = conversions[currentScale];
  } else {
    displayTemperature(temp)
  }

  return currentTemp.innerHTML;
};