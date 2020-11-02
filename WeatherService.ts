import { Coords, UnitSystem } from "./types";
import { config } from "./config";

class WeatherService {
  baseUrl: string = `https://api.openweathermap.org/data/2.5/weather`;

  apiKey = config.API_KEY;

  makeUrl(
    { latitude, longitude }: Coords,
    unit: UnitSystem = UnitSystem.metric
  ) {
    return `${this.baseUrl}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${this.apiKey}`;
  }

  async getWeather(
    { latitude, longitude }: Coords,
    unit: UnitSystem = UnitSystem.metric
  ) {
    const url = this.makeUrl({ latitude, longitude }, unit);
    return await (await fetch(url)).json();
  }
}

export default new WeatherService();
