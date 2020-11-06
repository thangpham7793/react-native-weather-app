import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ReloadButton({
  reFetchWeatherData,
}: {
  reFetchWeatherData: () => void;
}) {
  return (
    <TouchableOpacity onPress={reFetchWeatherData}>
      <Text>Refresh</Text>
    </TouchableOpacity>
  );
}
