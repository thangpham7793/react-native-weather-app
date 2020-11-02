import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { WeatherInfoViewProps, Colors } from "../types";

export default function WeatherInfoView(props: WeatherInfoViewProps) {
  const {
    unitSystem,
    weatherInfo: { icon, description },
    mainInfo: { temp },
    name,
  } = props;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.view}>
      <Text style={{ ...styles.textSecondary }}>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.textPrimary}>
        {temp}
        {unitSystem === "metric" ? "°C" : "°F"}
      </Text>
      <Text style={{ ...styles.description, ...styles.textSecondary }}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    width: "100%",
  },
  description: {
    textTransform: "capitalize",
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  textPrimary: {
    fontSize: 40,
    color: Colors.PRIMARY,
  },
  textSecondary: {
    fontSize: 20,
    color: Colors.SECONDARY,
    fontWeight: "500",
    marginTop: 20,
  },
});
