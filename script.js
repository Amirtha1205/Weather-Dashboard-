javascript 
const apiKey='d7d930c82c090484b16633d25ea9b927'; // Replace this with your OpenWeather API key

async function getWeather() {
    const city = document.getElementById('city-name').value;
    const errorMessage = document.getElementById('error-message');
    const weatherDetails = document.getElementById('weather-details');
    const weatherIcon = document.getElementById('weather-icon');
    const cityName = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const description = document.getElementById('description');

    if (city === '') {
        errorMessage.textContent = 'Please enter a city name';
        weatherDetails.style.display = 'none';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            errorMessage.textContent = 'City not found';
            weatherDetails.style.display = 'none';
        } else {
            errorMessage.textContent = '';
            weatherDetails.style.display = 'block';
            cityName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp} °C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            description.textContent = `Condition: ${data.weather[0].description}`;

            // Weather icons based on the condition
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        }
    } catch (error) {
        errorMessage.textContent = 'Error fetching weather data';
        weatherDetails.style.display = 'none';
    }
}
