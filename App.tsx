import React from "react";
import { View, Text } from "react-native";
import ThemeContextProvider from "./ThemeContext";
import WeatherApp from "./WeatherApp";

export default function App() {
  return (
    <ThemeContextProvider>
      <WeatherApp />
    </ThemeContextProvider>
  );
}
