document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'b87bfeb26ed9a418649aaa4e4201c339';  
    const apiUrl = 'https://api.openweathermap.org/data/2.5/';
    const weatherContainer = document.getElementById('weatherContainer');
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        try {
            const currentWeatherResponse = await fetch(`${apiUrl}weather?q=${city}&units=metric&appid=${apiKey}`);
            const currentWeatherData = await currentWeatherResponse.json();

            const forecastResponse = await fetch(`${apiUrl}forecast?q=${city}&units=metric&appid=${apiKey}`);
            const forecastData = await forecastResponse.json();

            displayWeather(currentWeatherData, forecastData);
        } catch (error) {
            alert('Error fetching weather data. Please try again.');
        }
    }

    function displayWeather(currentWeatherData, forecastData) {
        weatherContainer.innerHTML = '';

        const currentWeatherHTML = `
            <div class="col-md-12 weather-card">
                <h3>Current Weather in ${currentWeatherData.name}</h3>
                <p><strong>Temperature:</strong> ${currentWeatherData.main.temp}°C</p>
                <p><strong>Humidity:</strong> ${currentWeatherData.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${currentWeatherData.wind.speed} m/s</p>
                <p><strong>Description:</strong> ${currentWeatherData.weather[0].description}</p>
            </div>
        `;

        weatherContainer.innerHTML += currentWeatherHTML;

        const forecastHTML = forecastData.list.map((forecast, index) => {
            if (index % 8 === 0) {
                return `
                    <div class="col-md-4 weather-card">
                        <h5>${new Date(forecast.dt_txt).toLocaleDateString()}</h5>
                        <p><strong>Temperature:</strong> ${forecast.main.temp}°C</p>
                        <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${forecast.wind.speed} m/s</p>
                        <p><strong>Description:</strong> ${forecast.weather[0].description}</p>
                    </div>
                `;
            }
        }).join('');

        weatherContainer.innerHTML += forecastHTML;
    }
});
