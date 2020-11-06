export type Coords = {
  latitude: number;
  longitude: number;
};

export type MainInfo = {
  temp: number;
  feels_like: number;
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

type PRIMARY = "#ff304f" | "black";
type SECONDARY = "#002651" | "yellow";
type BORDER = "#dbdbdb";
type BACKGROUND = "#fff" | "#333";

export type AppColors = {
  PRIMARY: PRIMARY;
  SECONDARY: SECONDARY;
  BORDER: BORDER;
  BACKGROUND: BACKGROUND;
};

export enum Colors {
  "PRIMARY" = "#ff304f",
  "SECONDARY" = "#002651",
  "BORDER" = "#dbdbdb",
  "BACKGROUND" = "#fff",
}
