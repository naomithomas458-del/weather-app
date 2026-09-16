# 🌤️ Weather App

A responsive weather application built with **HTML, CSS, and JavaScript** that provides current weather information and a 5-day forecast for searched cities or the user's current location.

The app uses the **OpenWeather API** to retrieve real-time weather data and dynamically changes the background video according to the current weather conditions.

## ✨ Features

* 🔎 Search weather by city
* 📍 Get weather using your current location
* 🌡️ Current temperature in Celsius and Fahrenheit
* 📅 5-day weather forecast
* 💧 Humidity information
* 💨 Wind speed
* 🌅 Sunrise and sunset times
* 🌡️ Feels-like temperature
* 🔺 Minimum and maximum temperature
* 🌧️ Rain probability
* 🌤️ Dynamic day/night weather display
* 🎥 Weather-based background videos
* 🖼️ City background images
* 🪟 Glassmorphism user interface
* 📱 Responsive layout
* 🔄 Celsius/Fahrenheit unit switching
* ⏳ Loading indicator while weather data is being retrieved

## 🛠️ Technologies Used

* **HTML5** – Page structure
* **CSS3** – Styling, responsive design, glassmorphism effects and animations
* **JavaScript** – Application logic, API requests and dynamic content
* **OpenWeather API** – Weather and forecast data
* **Geolocation API** – Detects the user's current location
* **Git & GitHub** – Version control and project hosting

## 🌦️ Weather Backgrounds

The application dynamically changes its background video depending on the weather condition.

Examples include:

* ☀️ Clear Sky – Day
* 🌙 Clear Sky – Night
* ☁️ Clouds – Day
* 🌙 Clouds – Night
* 🌧️ Rain
* ❄️ Snow
* ⛈️ Thunderstorm
* 🌫️ Mist, Fog and Haze

This helps make the interface more interactive and visually connected to the current weather.

## 📍 Location Feature

The **My Location** button uses the browser's Geolocation API to determine the user's current coordinates.

Those coordinates are then sent to the OpenWeather API to retrieve the weather for that location.

## 📊 Weather Information

The main weather card displays information such as:

* Current temperature
* Weather condition
* Weather description
* Feels-like temperature
* Humidity
* Wind speed
* Sunrise
* Sunset
* Minimum temperature
* Maximum temperature
* Rain probability

The forecast section provides weather information for the upcoming 5 days.

## 🔄 Temperature Units

Users can switch between:

**°C Celsius**

and

**°F Fahrenheit**

The weather information updates automatically when the selected unit changes.

## 📁 Project Structure

```text
weather-app/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│   ├── cape-town.jpg
│   ├── Johannesburg.jpg
│   ├── london.jpg
│   └── Tokyo.jpg
│
└── videos/
    ├── bg-video (3).mp4
    ├── clearsky.mp4
    ├── clearnight.mp4
    ├── clouds.mp4
    ├── cloudynight.mp4
    ├── rain-2.mp4
    ├── rain-night.mp4
    ├── snow.mp4
    ├── thunderstorms.mp4
    └── mist.mp4
```


## 🎯 What I Learned

Building this project helped me practise:

* Working with APIs
* Using `fetch()` to retrieve data
* Working with JSON data
* JavaScript functions
* DOM manipulation
* Event listeners
* Conditional statements
* Geolocation
* Working with dates and timestamps
* Celsius/Fahrenheit conversions
* Dynamic UI updates
* Responsive CSS
* CSS glassmorphism
* Git and GitHub
* Debugging JavaScript errors

## 🔮 Future Improvements

Some features I would like to explore in future versions include:

* Save favourite cities
* Search history
* More detailed hourly forecasts
* Weather alerts
* Additional weather animations
* Improved mobile optimisation
* More location-based features

## 👩🏽‍💻 Author

**Naomi Thomas**

Aspiring Full-Stack Developer

Built as part of my web development learning journey.

---

⭐ If you found this project interesting, feel free to explore the repository and follow my development journey.
