import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Api } from '@/services/Api';

let cachedCities = localStorage.getItem('cities') ?? [];

if (typeof cachedCities === 'string') {
  cachedCities = JSON.parse(cachedCities);
}

export const useMainStore = defineStore('mainStore', () => {
  const cities = ref(cachedCities);

  function getWeather(weather) {
    weather.weather[0].icon = getIcon(weather.weather[0].icon);
    weather.date = new Date().toLocaleString();
    cities.value.push(weather);
    localStorage.setItem('cities', JSON.stringify(cities.value));
  }

  function getIcon(value) {
    return `http://www.openweathermap.org/img/wn/${value}@2x.png`;
  }

  function deleteCityById(id) {
    const index = cities.value.findIndex((item) => item.id === id);
    cities.value.splice(index, 1);
    localStorage.setItem('cities', JSON.stringify(cities.value));
  }

  function refreshCity(weather) {
    const index = cities.value.findIndex((item) => item.id === weather.id);
    weather.weather[0].icon = getIcon(weather.weather[0].icon);
    weather.date = new Date().toLocaleString();
    cities.value.splice(index, 1, weather);
    localStorage.setItem('cities', JSON.stringify(cities.value));
  }

  async function onAdd(city) {
    const weatherData = await Api.getWeatherForCity(city);

    if (weatherData) {
      if (cities.value.some((city) => city.id === weatherData.id)) {
        alert('You already have this city in the list!');
      } else {
        getWeather(weatherData);
      }
    }
  }

  async function onRefresh(city) {
    const weatherData = await Api.getWeatherForCity(city);

    if (weatherData) {
      refreshCity(weatherData);
    }
  }

  return { onAdd, onRefresh, deleteCityById, cities };
});
