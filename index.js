function loadDoc() {
  const key = 'a6a2cec7737de68bac44ec6349002f5b';
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${11221}&units=imperial&appid=${key}`

  const xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      const payload = JSON.parse(this.responseText);
      const tempInF = Math.round(payload.main.temp);

      displayWeather(tempInF);
    };
  };

  xhttp.open('GET', url, true);
  xhttp.send();
}

function displayWeather(weather) {
  document.getElementById('weather').innerHTML = weather;
};


loadDoc();


