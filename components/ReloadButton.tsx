import React from "react";
import { TouchableOpacity } from "react-native";

export default function ReloadButton({
  reFetchWeatherData,
  icon = null,
}: {
  reFetchWeatherData: () => void;
  icon: null | JSX.Element;
}) {
  return (
    <TouchableOpacity onPress={reFetchWeatherData}>{icon}</TouchableOpacity>
  );
}
