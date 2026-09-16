const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchBtn');
const weatherDiv = document.getElementById('weather');
const loading = document.getElementById('loading');
const locationBtn = document.getElementById('locationBtn');
const celsiusBtn = document.getElementById('celsiusBtn');
const fahrenheitBtn = document.getElementById('fahrenheitBtn');
const forecastContainer = document.getElementById('forecastContainer');
const homePage = document.getElementById('homePage');
const backHomeBtn = document.getElementById('backHomeBtn');


const apiKey = "aa8821f5280b1c7c812c9582dd4a5d8b";

let isDayTime = false;

function changeBackgroundVideo(weather, isDayTime) {

    const video = document.getElementById("bg-video");
    const videoSource = video.getElementsByTagName("source")[0];

    if (weather === "Clear") {

        videoSource.src = isDayTime
            ? "videos/clearsky.mp4"
            : "videos/clearnight.mp4";

    } else if (weather === "Clouds") {

        videoSource.src = isDayTime
            ? "videos/clouds.mp4"
            : "videos/cloudynight.mp4";

    } else if (weather === "Rain" || weather === "Drizzle") {

        videoSource.src = isDayTime
            ? "videos/rain-2.mp4"
            : "videos/rain-night.mp4";

    } else if (weather === "Snow") {

        videoSource.src = "videos/snow.mp4";

    } else if (weather === "Thunderstorm") {

        videoSource.src = "videos/thunderstorms.mp4";

    } else if (
        weather === "Mist" ||
        weather === "Fog" ||
        weather === "Haze"
    ) {

        videoSource.src = "videos/mist.mp4";
    }

    video.load();
    video.play();
}



function showWeatherResults() {
    homePage.style.display = "none";
    document.querySelector(".weather-results").style.display = "block";
}


backHomeBtn.addEventListener('click', () => {

    homePage.style.display = "block";
    document.querySelector(".weather-results").style.display = "none";


    weatherDiv.innerHTML = "";
    forecastContainer.innerHTML = "";
    cityInput.value = "";

    const bgVideo = document.getElementById("bg-video");
     const videoSource = bgVideo.getElementsByTagName("source")[0];

    videoSource.src = "videos/bg-video (3).mp4";
    bgVideo.load();
    bgVideo.play();
});





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

           isDayTime = currentTime > sunrise && currentTime < sunset;
          
           changeBackgroundVideo(weather, isDayTime);



         console.log("Sunrise timestamp:", data.sys.sunrise);
         console.log("Sunset timestamp:", data.sys.sunset);
         console.log("Timezone:", data.timezone);

          const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString("en-GB", {
             hour: "2-digit",
             minute: "2-digit",
             timeZone: "UTC"
            });
        
         const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC"
         });

         console.log("Correct Sunrise:", sunriseTime);
         console.log("Correct Sunset:", sunsetTime);

         // Weather successfully received — switch from home page to weather results
          showWeatherResults();

       weatherDiv.innerHTML = `
       <div class="weather-card" id="weatherCard">
       <h2>${data.name}, ${data.sys.country}</h2>
       <p>🕒${localTime}</p>
       <p>📅${localDate}</p>
       <div class="main-weather">
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
         alt="${data.weather[0].description}">
         <p class="temperature" id="temperature">${Math.round(celsiusTemp)}°C</p>
        <p class="weather-description">${data.weather[0].description}</p>
       </div>
      <div class="weather-details">
      <div class="detail-box">
        <span>💧</span>
        <strong>Humidity</strong>
        <p>${data.main.humidity}%</p>
    </div>
     <div class="detail-box">
        <span>💨</span>
        <strong>Wind Speed</strong>
        <p>${data.wind.speed} m/s</p>
    </div>
      <div class="detail-box">
    <span>🌧️</span>
    <strong>Rain Probability</strong>
    <p id="rainProbability">0%</p>
</div>
   <div class="detail-box">
        <span>🌡️</span>
        <strong>Feels Like</strong>
        <p>${Math.round(data.main.feels_like)}°C</p>
    </div>
   <div class="detail-box">
        <span>🔻</span>
        <strong>Min Temperature</strong>
        <p>${Math.round(data.main.temp_min )}°C</p>
    </div>
    <div class="detail-box">
        <span>🔺</span>
        <strong>Max Temperature</strong>
        <p>${Math.round(data.main.temp_max)}°C</p>
    </div>
   <div class="detail-box">
        <span>🌅</span>
        <strong>Sunrise</strong>
        <p>${sunriseTime}</p>
    </div>
    <div class="detail-box">
        <span>🌇</span>
        <strong>Sunset</strong>
        <p>${sunsetTime}</p>
    </div>
  </div>
        </div>`;

   if (currentTime >= sunrise && currentTime < sunset) {

    document.getElementById("weatherCard").classList.add("light-mode");
    document.getElementById("weatherCard").classList.remove("dark-mode");

    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");

} else {

    document.getElementById("weatherCard").classList.add("dark-mode");
    document.getElementById("weatherCard").classList.remove("light-mode");

    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
}

        const temperature = document.getElementById('temperature');

     celsiusBtn.addEventListener('click', () => {

    temperature.textContent = `${Math.round(celsiusTemp)}°C`;

    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
});

fahrenheitBtn.addEventListener('click', () => {

    temperature.textContent = `${Math.round(fahrenheitTemp)}°F`;

    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
});
celsiusBtn.classList.add("active");
fahrenheitBtn.classList.remove("active");

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

    // Get today's forecast entries
    const today = data.list[0].dt_txt.split(" ")[0];

    const todayForecasts = data.list.filter(item =>
        item.dt_txt.startsWith(today)
    );

    // Highest rain probability for today
    const rainProbility = Math.round(
        Math.max(...todayForecasts.map(item => item.pop || 0)) * 100
    );

    displayForecast(data, isDayTime, rainProbility);

    // Update rain probability on the main weather card
    const rainElement = document.getElementById("rainProbability");

    if (rainElement) {
        rainElement.textContent = `${rainProbility}%`;
    }
})
.catch(error => {
    console.error("Forecast error:", error);
});
})

cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
            // Trigger the search functionality
        }
    });


function displayForecast(forecastData, isDayTime, rainProbability) {
    forecastContainer.innerHTML = "";

    // Group forecasts by day
    const dailyData = {};

    forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyData[date]) {
            dailyData[date] = [];
        }

        dailyData[date].push(item);
    });

    // Get the first 5 days
    const days = Object.values(dailyData).slice(1, 6);// skips today and gets the next 5 days

    days.forEach((dayData) => {

        // Find the highest and lowest temperature for the day
        const highTemp = Math.max(
            ...dayData.map(item => item.main.temp)
        );

        const lowTemp = Math.min(
            ...dayData.map(item => item.main.temp)
        );

        // Use the middle/daytime forecast for the weather icon
        const middayForecast =
            dayData.find(item => item.dt_txt.includes("12:00:00"))
            || dayData[Math.floor(dayData.length / 2)];

        // Get the highest rain probability
        const rainChance = Math.round(
            Math.max(...dayData.map(item => item.pop || 0)) * 100
        );

        // Use the midday wind speed
        const windSpeed = middayForecast.wind.speed;

        const forecastCard = document.createElement("div");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
    <div class="forecast-heading">

        <h3>${new Date(dayData[0].dt * 1000).toLocaleDateString([], {
            weekday: "long"
        })}</h3>

        <img src="https://openweathermap.org/img/wn/${middayForecast.weather[0].icon}@2x.png">

        <p class="forecast-description">
            ${middayForecast.weather[0].description}
        </p>

        <p class="forecast-temperature">
            <strong>${Math.round(highTemp)}°C</strong>
            / ${Math.round(lowTemp)}°C
        </p>

        <p>💨 ${windSpeed} m/s</p>

        <p>🌧️ ${rainChance}%</p>

    </div>
`;

        forecastContainer.appendChild(forecastCard);
    });

    // Light/dark mode
    if (isDayTime) {
        forecastContainer.classList.add("light-mode");
        forecastContainer.classList.remove("dark-mode");
    } else {
        forecastContainer.classList.add("dark-mode");
        forecastContainer.classList.remove("light-mode");
    }
}

// LOCATION BUTTON
locationBtn.addEventListener("click", () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);

                weatherDiv.innerHTML = `<p>Loading weather for your location...</p>`;
                loading.style.display = "block";

                // CURRENT WEATHER
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {

                        console.log("Location weather:", data);

                        loading.style.display = "none";

                        // Location weather successfully received — switch to weather results
                          showWeatherResults();

                        const celsiusTemp = data.main.temp;
                        const fahrenheitTemp = (celsiusTemp * 9 / 5) + 32;

                        const weather = data.weather[0].main;

                        const currentTime = data.dt + data.timezone;
                        const sunrise = data.sys.sunrise + data.timezone;
                        const sunset = data.sys.sunset + data.timezone;

                        isDayTime = currentTime >= sunrise && currentTime < sunset;

                     

                       changeBackgroundVideo(weather, isDayTime);

                        // SUNRISE / SUNSET
                        const sunriseTime = new Date(
                            (data.sys.sunrise + data.timezone) * 1000
                        ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC"
                        });

                        const sunsetTime = new Date(
                            (data.sys.sunset + data.timezone) * 1000
                        ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC"
                        });

                        // MAIN WEATHER CARD
                        weatherDiv.innerHTML = `
                            <div class="weather-card" id="weatherCard">

                                <h2>${data.name}, ${data.sys.country}</h2>

                                <div class="main-weather">

                                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                                         alt="${data.weather[0].description}">

                                    <p class="temperature" id="temperature">
                                        ${Math.round(celsiusTemp)}°C
                                    </p>

                                    <p class="weather-description">
                                        ${data.weather[0].description}
                                    </p>

                                </div>

                                <div class="weather-details">

                                    <div class="detail-box">
                                        <span>💧</span>
                                        <strong>Humidity</strong>
                                        <p>${data.main.humidity}%</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>💨</span>
                                        <strong>Wind Speed</strong>
                                        <p>${data.wind.speed} m/s</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>🌧️</span>
                                        <strong>Rain Probability</strong>
                                        <p id="rainProbability">0%</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>🌡️</span>
                                        <strong>Feels Like</strong>
                                        <p>${Math.round(data.main.feels_like)}°C</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>🔻</span>
                                        <strong>Min Temperature</strong>
                                        <p>${Math.round(data.main.temp_min)}°C</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>🔺</span>
                                        <strong>Max Temperature</strong>
                                        <p>${Math.round(data.main.temp_max)}°C</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>🌅</span>
                                        <strong>Sunrise</strong>
                                        <p>${sunriseTime}</p>
                                    </div>

                                    <div class="detail-box">
                                        <span>🌇</span>
                                        <strong>Sunset</strong>
                                        <p>${sunsetTime}</p>
                                    </div>

                                </div>

                            </div>
                        `;

                        // LIGHT / DARK MODE
                        const weatherCard = document.getElementById("weatherCard");

                 if (isDayTime) {

    weatherCard.classList.add("light-mode");
    weatherCard.classList.remove("dark-mode");

    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");

} else {

    weatherCard.classList.add("dark-mode");
    weatherCard.classList.remove("light-mode");

    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
}

                        // CELSIUS / FAHRENHEIT BUTTONS
     const temperature = document.getElementById("temperature");

                        celsiusBtn.onclick = () => {

    temperature.textContent =
        `${Math.round(celsiusTemp)}°C`;

    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
};

fahrenheitBtn.onclick = () => {

    temperature.textContent =
        `${Math.round(fahrenheitTemp)}°F`;

    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
};
celsiusBtn.classList.add("active");
fahrenheitBtn.classList.remove("active");

                    })

                    .catch(error => {
                        console.error("Location weather error:", error);
                        loading.style.display = "none";
                        weatherDiv.innerHTML =
                            `<p>Could not get weather for your location.</p>`;
                    });


                // LOCATION FORECAST
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {

                        console.log("Location forecast:", data);

                        // Get today's forecast entries
                        const today = data.list[0].dt_txt.split(" ")[0];

                        const todayForecasts = data.list.filter(item =>
                            item.dt_txt.startsWith(today)
                        );

                        // Highest rain probability for today
                        const rainProbility = Math.round(
                            Math.max(
                                ...todayForecasts.map(item => item.pop || 0)
                            ) * 100
                        );

                        // Display the new location forecast
                        displayForecast(
                            data,
                            isDayTime,
                            rainProbility
                        );

                        // Update rain probability
                        const rainElement =
                            document.getElementById("rainProbability");

                        if (rainElement) {
                            rainElement.textContent =
                                `${rainProbility}%`;
                        }

                    })

                    .catch(error => {
                        console.error("Location forecast error:", error);
                    });

            },

            (error) => {

                console.error("Location error:", error);

                weatherDiv.innerHTML =
                    `<p>Unable to get your location. Please allow location access.</p>`;
            }
        );

    } else {

        weatherDiv.innerHTML =
            `<p>Geolocation is not supported by this browser.</p>`;
    }
});