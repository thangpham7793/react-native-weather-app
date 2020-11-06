export type Coords = {
  latitude: number;
  longitude: number;
};

export type MainInfo = {
  temp: number;
};

export type WeatherInfo = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type WeatherInfoViewProps = {
  mainInfo: MainInfo;
  weatherInfo: WeatherInfo;
  unitSystem: UnitSystem;
  name: string;
};

export type WindInfo = {
  deg: number;
  speed: number;
};

export type MainWeatherInfo = {
  feels_like: number;
  humidity: number;
};

export enum UnitSystem {
  "imperial" = "imperial",
  "metric" = "metric",
}

export enum Colors {
  "PRIMARY" = "#ff304f",
  "SECONDARY" = "#002651",
  "BORDER" = "#dbdbdb",
}
