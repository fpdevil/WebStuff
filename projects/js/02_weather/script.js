const metadata = {
    base_url: "https://api.openweathermap.org/data/2.5/weather",
    api_key: "fcc8de7015bbb202209bbf0261babf4c"
};

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const dateValue = document.getElementById('date');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    // if Get Weather button is clicked, trigger an event
    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        // make an api call
        try {
            const weatherInfo =  await getWeatherInfo(city);
            displayWeatherInfo(weatherInfo);
        } catch (error) {
            displayError();
        }
    });

    async function getWeatherInfo(city) {
        const url = `${metadata.base_url}?q=${city}&units=metric&appid=${metadata.api_key}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`City not found: ${response.status}`);
        }

        const json = await response.json();
        return json;
    }

    function displayWeatherInfo(data) {
        const {name, weather, main, sys} = data;

        // set values
        cityName.textContent = `${name}, ${sys.country}`;

        let now = new Date();
        date.innerText = dateFormat(now);

        temperature.textContent = `Temperature: ${Math.round(main.temp)}°C`;
        // temperature.innerHTML = `Temperature: ${Math.round(main.temp)} <sup>°C</sup>`;

        description.textContent = `Weather: ${weather[0].main}`;

        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        // const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        const fig = document.createElement('figure');
        const markup = `<img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                        <figcaption>${weather[0]["description"]}</figcaption>`;
        fig.innerHTML = markup;
        weatherInfo.appendChild(fig);

        // unlock display by removing hidden class
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function displayError() {
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function dateFormat(d) {
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        let weekDay = days[d.getDay()]; // day of the week
        let monthDay = d.getDate(); // day of the month
        let month = months[d.getMonth()] // month of the year
        let year = d.getFullYear(); // the full year in YYYY

        return `${weekDay} ${monthDay}, ${month} ${year}`;
    }
});