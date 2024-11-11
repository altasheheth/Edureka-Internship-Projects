// Select required DOM (Document Object Model) elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Fetch and Display weather data for the selected location
search.addEventListener('click', () => {
    console.log("Search button clicked"); //Message appears in the console to confirm that search button was clicked

    const APIKey = 'd5b9e47714dbddd92315fe9f40ef5a16'; //APIKey from openweathermap.org
    const city = document.querySelector('.search-box input').value; //Reads Location to return weather

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => {

        return response.json().then(json => {
            if (json.cod === '404') {
                throw new Error('Location not found');
            }
            return json;
        });

    })    
    .then(json => {
        console.log(json); //Log the response to see if data was received correctly

        // Display weather information
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (json.weather && json.weather[0]) {
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'Images/clear.png';                
                    break;

                case 'Rain':
                    image.src = 'Images/rain.png';                
                    break;

                case 'Snow':
                    image.src = 'Images/snow.png';                
                    break;

                case 'Clouds':
                case 'Few Clouds':
                case 'Broken Clouds':
                case 'Scattered Clouds':
                    image.src = 'Images/cloud.png';                
                    break;

                case 'Mist':
                    image.src = 'Images/mist.png';                
                    break;

                case 'Haze':
                    image.src = 'Images/mist.png';                
                    break;
        
                default:
                    image.src = 'Images/clear.png';
            }
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);

        // Display error message if location is not found
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active'); //show the error404 element
    });
})
