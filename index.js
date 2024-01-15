const weatherForm = document.querySelector(".weather-class");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apikey = "8d84d2628d968303f008d955c3633ca8";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError('Please enter a city');
    }
});
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    return await response.json();
}

function displayWeather(data){
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

   cityDisplay.textContent = city;
   cityDisplay.classList.add("city-display");
   card.appendChild(cityDisplay);

   tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°c`;
   tempDisplay.classList.add("temp-display");
   card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity-display");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatheremoji.textContent = weatherEmoji(id);
    weatheremoji.classList.add("weatherEmoji");
    card.appendChild(weatheremoji);
}

function weatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId<300):
            return "⛈️";
        case (weatherId >= 300 && weatherId<400):
            return "🌧️";
        case (weatherId >= 500 && weatherId<600):
            return "🌧️";
        case (weatherId >= 600 && weatherId<700):
            return "❄️";
        case (weatherId >= 700 && weatherId<800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId<810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}