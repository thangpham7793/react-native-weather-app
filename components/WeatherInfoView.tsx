import React from "react";
import { StyleSheet, Image } from "react-native";
import { WeatherInfoViewProps } from "../types";
import AppText from "./AppText";
import Container from "./Container";

export default function WeatherInfoView(props: WeatherInfoViewProps) {
  const {
    unitSystem,
    weatherInfo: { icon, description },
    mainInfo: { temp, feels_like },
    name,
  } = props;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <Container>
      <AppText
        content={name}
        type="secondary"
        otherTextStyle={{ textTransform: "capitalize" }}
      />
      <Image source={{ uri: iconUrl }} style={styles.icon} />

      <AppText
        type="secondary"
        otherTextStyle={{ textTransform: "capitalize" }}
        content={description}
      />

      <AppText
        type="primary"
        content={`${temp}${unitSystem === "metric" ? "°C" : "°F"}`}
      />

      <AppText
        type="secondary"
        otherTextStyle={{ fontSize: 15 }}
        content={`Feels Like ${feels_like}${
          unitSystem === "metric" ? "°C" : "°F"
        }`}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 120,
    height: 100,
    resizeMode: "contain",
  },
});
