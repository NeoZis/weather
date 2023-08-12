import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCounterStore = defineStore('mainStore', () => {
  const id = ref(0);
  const cities = reactive([]);

  function getWeather(weather) {
    weather.idCity = id.value;
    weather.show = false;
    weather.weather[0].icon = getIcon(weather.weather[0].icon);
    weather.date = new Date().toLocaleString();
    cities.push(weather);
    increment();
  }

  function getIcon(value) {
    return `http://www.openweathermap.org/img/wn/${value}@2x.png`;
  }

  function deleteCityById(id) {
    const index = cities.findIndex((item) => item.idCity === id);
    cities.splice(index, 1);
  }

  function showControl(id) {
    const index = cities.findIndex((item) => item.idCity === id);

    cities[index].show = cities[index].show === false;
  }

  function refreshCity(weather) {
    const index = cities.findIndex((item) => item.idCity === weather.idCity);
    weather.weather[0].icon = getIcon(weather.weather[0].icon);
    weather.date = new Date().toLocaleString();
    cities.splice(index, 1, weather);
  }

  async function onAdd(city) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=`);
      const weather = response.data;
      commit("GET_WEATHER", weather);
    } catch (err) {
      alert('There is no such city in the database!')
    }
  }

  function increment() {
    id.value++;
  }

  return {id, increment};
});
