const input = document.querySelector("input");
const form = document.querySelector("form");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind");
const submitButton = document.querySelector("form button");
const forecasts = document.querySelectorAll(".forecasts div");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

submitButton.addEventListener("click", fetchData);
form.addEventListener("submit", (event) => {
    event.preventDefault();
})

input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        fetchData();
    }
});

async function fetchData() {
    if (!input.value) {
        console.error("Veuillez entrer une ville.");
        return;
    }

    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${input.value}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4685e83adbmshbe621af8b52500bp19db03jsna57eb0a7e344',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Impossible de récupérer les données météo.");
        }

        const result = await response.json();
        console.log(result);

        const forecastsData = result.forecasts;
        const temperatureData = result.current_observation.condition.temperature;
        const skyState = result.current_observation.condition.text;
        const dataWind = result.current_observation.wind.speed;
        const dataCity = result.location.city;
        const dataSunrise = result.current_observation.astronomy.sunrise;
        const dataSunset = result.current_observation.astronomy.sunset;

        const temperature_in_celsius = (temperatureData - 32) * (5 / 9);
        temperature.textContent = `${temperature_in_celsius.toFixed(2)}°C`;

        wind.innerHTML = `
        <img src="assets/wind-solid.svg" alt="">
        Wind speed : ${dataWind} 
        `;

        for (let i = 0; i < forecasts.length; i++) {
            forecasts[i].innerHTML = `
            <p>${forecastsData[i].day}</p>
            <p>${forecastsData[i].text}</p>
            `;
            forecasts[i].classList.add("forecasts-shape");
        }

        sunrise.innerHTML = `
        <img src="assets/sunrise.png" alt="">
        <p>Sunrise</p>
        <p>${dataSunrise}</p>
        `;
        sunrise.classList.add("sun-hours-shape");

        sunset.innerHTML = `
        <img src="assets/sunset.png" alt="">
        <p>Sunset</p>
        <p>${dataSunset}</p>
        `;
        sunset.classList.add("sun-hours-shape");
    } catch (error) {
        console.error(error.message);
    }
}
