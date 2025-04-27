const apiKey = '1663ba6350f7c86be06f6d2cd6c2b353'; 

function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (city === '') {
    alert('Please enter a city name!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => showWeather(data))
    .catch(error => {
      document.getElementById('weather-result').style.display = 'none';
      alert(error.message);
    });

    const toggle = document.getElementById('dark-mode-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

}

function showWeather(data) {
    const weatherDiv = document.getElementById('weather-result');
    weatherDiv.style.display = 'block';
  
    const sunriseTimestamp = data.sys.sunrise;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    const sunsetTimestamp = data.sys.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      <p><strong>Sunrise:</strong> ${sunriseTime}</p>
      <p><strong>Sunset:</strong> ${sunsetTime}</p>
    `;
  }
  

