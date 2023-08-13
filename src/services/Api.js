import axios from 'axios';

export class Api {
  static async getWeatherForCity(name) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${import.meta.env.VITE_APP_ID}`);

      return response.data;
    } catch (err) {
      alert('There is no such city in the database!');
    }

    return null;
  }
}