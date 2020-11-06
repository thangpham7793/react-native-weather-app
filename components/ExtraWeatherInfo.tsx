import React from "react";
import { View, Text } from "react-native";
import { MainWeatherInfo, WindInfo } from "../types";
import Container from "./Container";

export default function ExtraWeatherInfo({
  windInfo,
  mainWeatherInfo,
}: {
  windInfo?: WindInfo;
  mainWeatherInfo?: MainWeatherInfo;
}) {
  let infos: JSX.Element[] = [];

  if (windInfo) {
    infos = Object.keys(windInfo).map((k) => {
      return (
        <Text>
          {k}: {windInfo[k as keyof WindInfo]}
        </Text>
      );
    });
  }

  if (mainWeatherInfo) {
    infos = Object.keys(mainWeatherInfo)
      .filter((k) => ["feels_like", "humidity"].includes(k))
      .map((k) => {
        return (
          <Text>
            {k}: {mainWeatherInfo[k as keyof MainWeatherInfo]}
          </Text>
        );
      });
  }

  return infos.length === 0 ? null : (
    <Container
      size={6}
      direction="column"
      otherViewStyle={{ borderColor: "black", borderWidth: 1 }}
      children={infos}
    />
  );
}
