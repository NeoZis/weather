import axios from "axios";

export default {
  async onAdd({commit}, city) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fdc5c7b31d822cd909a6ffa9fab71737`);
      const weather = response.data;
      commit("GET_WEATHER", weather);
    } catch (err) {
      alert('There is no such city in the database!')
    }
  },
  onDelete({commit}, id) {
    commit("DELETE_CITY", id)
  },
  async onRefresh({commit}, obj) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${obj.name}&units=metric&appid=fdc5c7b31d822cd909a6ffa9fab71737`);
    const weather = response.data;
    weather.idCity = obj.idCity;
    weather.show = obj.show;
    commit("REFRESH_CITY", weather)
  },
  onActive({commit}, id) {
    commit("SHOW_CONTROL", id)
  }
}