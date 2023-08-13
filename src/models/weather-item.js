export class WeatherItem {
  constructor(weather) {
    this.id = weather.id;
    this.name = weather.name;
    this.description = weather.weather[0].description;
    this.iconType = weather.weather[0].icon;
    this.date = new Date().toLocaleString();

    this.data = {
      temperature: weather.main.temp,
      pressure: weather.main.pressure,
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
      clouds: weather.clouds.all,
    };
  }

  get icon() {
    return `https://www.openweathermap.org/img/wn/${this.iconType}@2x.png`;
  }

  get dataWithUnits() {
    return {
      temperature: `${this.data.temperature} \xB0C`,
      pressure: `${this.data.pressure} hPa`,
      humidity: `${this.data.humidity} %`,
      windSpeed: `${this.data.windSpeed} meter/sec`,
      clouds: `${this.data.clouds} %`,
    };
  }
}