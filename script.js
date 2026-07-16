const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchBtn');
const weatherDiv = document.getElementById('weather');
const loading = document.getElementById('loading');
const locationBtn = document.getElementById('locationBtn');
const celsiusBtn = document.getElementById('celsiusBtn');
const fahrenheitBtn = document.getElementById('fahrenheitBtn');
const forecastContainer = document.getElementById('forecastContainer');


const apiKey = "aa8821f5280b1c7c812c9582dd4a5d8b&units=metric";




searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    console.log("button clicked");

    

    

   

    weatherDiv.innerHTML = `<p>Loading weather data for ${city}...</p>`;
    loading.style.display = 'block'; 
    weatherDiv.innerHTML= "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa8821f5280b1c7c812c9582dd4a5d8b&units=metric`)
    .then(response => response.json())

    .then(data => {// Process weather data

        setTimeout(() => {
         loading.style.display = 'none';
        }, 500);
        
       
        console.log(data);
        console.log(data.weather[0].description);
        if(data.cod === "404") {
            weatherDiv.innerHTML = `<p>City not found. Please check spelling and try again.</p>`;
            return;
        }

        const celsiusTemp = data.main.temp;
        const fahrenheitTemp = (celsiusTemp * 9/ 5) + 32;

           const weather = data.weather[0].main;
           const utcTime = new Date().getTime() + (new Date().getTimezoneOffset()* 60000);
           const cityTime = new Date ((data.dt + data.timezone)* 1000);
           const localTime = cityTime.toLocaleTimeString([],
            {
                hour:"2-digit",
                minute:"2-digit",
                hour12:false,
                timeZone:"UTC"
            });
            const localDate = cityTime.toLocaleDateString([], 
                {
                    weekday:"long",
                    day:"numeric",
                    month:"long",
                    year:"numeric",
                    timeZone:"UTC"
                });
          
           const video=document.getElementById('bg-video');
           const videoSource = video.getElementsByTagName("source")[0];
           

           const currentTime = data.dt + data.timezone;
           const sunrise = data.sys.sunrise + data.timezone;
           const sunset = data.sys.sunset + data.timezone;

           if (weather === "Clear") {
               if(currentTime >= sunrise || currentTime < sunset) {
                videoSource.src = "videos/clearnight.mp4";
               } else {
                videoSource.src = "videos/clearsky.mp4";
               }
               
           } else if (weather === "Clouds") {
               if(currentTime >= sunrise || currentTime < sunset) {
                videoSource.src = "videos/clouds.mp4";
               } else {
                videoSource.src = "videos/cloudynight.mp4";
               }

           } else if (weather === "Rain" || weather === "Drizzle") {
              if(currentTime >= sunrise || currentTime < sunset){
                videoSource.src = "videos/rain-night.mp4";
              } else {
                videoSource.src= "videos/rain-2.mp4";
              }

          }else if (weather === "Snow") {
              videoSource.src= "videos/snow.mp4";

          } else if (weather === "Thunderstorm"){
            videoSource.src = "videos/thunderstorms.mp4";

          }else if (
            weather === "Mist" ||
            weather === "Fog" ||
            weather === "Haze"
        ) {
            videoSource.src = "videos/mist.mp4";
        }

         video.load();
         video.play();



         console.log("Sunrise timestamp:", data.sys.sunrise);
         console.log("Sunset timestamp:", data.sys.sunset);
         console.log("Timezone:", data.timezone);

        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-GB", 
            {
            hour:"2-digit",
            minute:"2-digit"
        });
        console.log(data.sys.sunset);
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-GB",
             {
                hour:"2-digit",
                minute:"2-digit"

        });

       weatherDiv.innerHTML = `
       <div class="weather-card">
       <h2>${data.name}, ${data.sys.country}</h2>
       <p>🕒${localTime}</p>
       <p>📅${localDate}</p>
       <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <p class="temperature:"<span id="temperature">${Math.round(celsiusTemp)}°C</span></p>
        <p>☁️<strong>Weather:</strong> ${data.weather[0].description}</p>
        <p>💧<strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p>💨<strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p>🌡️<strong>feels like:</strong> ${data.main.feels_like}°C</p>
        <p>🔻<strong>Min Temperature:</strong> ${data.main.temp_min}°C</p>
        <p>🔺<strong>Max Temperature:</strong> ${data.main.temp_max}°C</p>
        <p>🌅<strong>Sunrise:</strong> ${sunriseTime}</p>
        <p>🌇<strong>Sunset:</strong> ${sunsetTime}</p>
        </div>`;

        const temperature = document.getElementById('temperature');

        celsiusBtn.addEventListener('click', () => {
            temperature.textContent = `${Math.round(celsiusTemp)}°C`;
        });

        fahrenheitBtn.addEventListener('click', () => {
            temperature.textContent = `${Math.round(fahrenheitTemp)}°F`;
        });

       cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
            // Trigger the search functionality
        }
    });

        cityInput.value = ''; // Clear the input field after displaying the weather data
                               
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        setTimeout(() => {
         loading.style.display = 'none';
        }, 500);
        weatherDiv.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
        
        
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
.then(response => response.json())
.then(data => {
    console.log(data);
    displayForecast(data);
})
.catch(error => {
    console.error("Forecast error:", error);
});






    
});
function displayForecast(forecastData) {
    forecastContainer.innerHTML = "";

    const dailyForecast = forecastData.list.filter((item) => 
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach((day) => {

        const forecastCard = document.createElement("div");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h3>${new Date(day.dt * 1000).toLocaleDateString([], {
                weekday: "long"
            })}</h3>

            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <p>${Math.round(day.main.temp)}°C</p>

            <p>${day.weather[0].description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}


