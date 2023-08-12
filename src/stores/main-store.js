import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMainStore = defineStore('mainStore', () => {
  const id = ref(0);
  const cities = ref([]);

  function getWeather(weather) {
    weather.idCity = id.value;
    weather.show = false;
    weather.weather[0].icon = getIcon(weather.weather[0].icon);
    weather.date = new Date().toLocaleString();
    cities.value.push(weather);
    console.log(cities.value);
    increment();
  }

  function getIcon(value) {
    return `http://www.openweathermap.org/img/wn/${value}@2x.png`;
  }

  function deleteCityById(id) {
    const index = cities.value.findIndex((item) => item.idCity === id);
    cities.value.splice(index, 1);
  }

  function showControl(id) {
    const index = cities.value.findIndex((item) => item.idCity === id);

    cities.value[index].show = cities.value[index].show === false;
  }

  function refreshCity(weather) {
    const index = cities.value.findIndex((item) => item.idCity === weather.idCity);
    weather.weather[0].icon = getIcon(weather.weather[0].icon);
    weather.date = new Date().toLocaleString();
    cities.value.splice(index, 1, weather);
  }

  async function onAdd(city) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`);
      const weather = response.data;
      getWeather(weather);
    } catch (err) {
      alert('There is no such city in the database!')
    }
  }

  async function onRefresh(obj) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${obj.name}&units=metric&appid=${import.meta.env.VITE_APP_ID}`);
    const weather = response.data;
    weather.idCity = obj.idCity;
    weather.show = obj.show;
    refreshCity(weather)
  }

  function onActive(id) {
    showControl(id)
  }

  function increment() {
    id.value++;
  }

  return {onAdd, onRefresh, onActive, deleteCityById, cities};
});
