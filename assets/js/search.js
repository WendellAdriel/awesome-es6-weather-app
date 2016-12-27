import * as ELEMENTS from './elements.js';
import {API_KEY, Http} from './http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from './weather-data.js';

const updateWeather = weatherData => {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESC.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMP.textContent = weatherData.temperature;
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
};

export const searchWeather = () => {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if (CITY_NAME.length === 0) return alert('Please enter a city name');

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';

  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`;
  Http.fetchData(URL)
    .then(response => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, response.weather[0].description.toUpperCase());
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperature = response.main.temp;
      updateWeather(WEATHER_PROXY);
    })
    .catch(error => alert(error));
};
