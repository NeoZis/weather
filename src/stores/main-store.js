import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Api } from '@/services/Api';
import { WeatherItem } from '@/models/weather-item';

const cachedCities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];

export const useMainStore = defineStore('mainStore', () => {
  const cities = ref(cachedCities);

  if (cities.value.length) {
    cities.value.forEach((item) => onRefresh(item.name));
  }

  function addWeatherItem(weather) {
    cities.value.push(new WeatherItem(weather));

    cacheCities();
  }

  function cacheCities() {
    localStorage.setItem('cities', JSON.stringify(cities.value));
  }

  function deleteCityById(id) {
    const index = cities.value.findIndex((item) => item.id === id);
    cities.value.splice(index, 1);

    cacheCities();
  }

  function refreshCity(weather) {
    const index = cities.value.findIndex((item) => item.id === weather.id);

    cities.value.splice(index, 1, new WeatherItem(weather));

    cacheCities();
  }

  async function onAdd(city) {
    const weatherData = await Api.getWeatherForCity(city);

    if (weatherData) {
      if (cities.value.some((city) => city.id === weatherData.id)) {
        alert('You already have this city in the list!');
      } else {
        addWeatherItem(weatherData);
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
