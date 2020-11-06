import React, { Fragment } from "react";
import {
  MainWeatherInfo,
  WindInfo,
  UnitSystem,
  ThemeContextProps,
} from "../types";
import AppText from "./AppText";
import Container from "./Container";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import utils from "../utils";
import { ThemeContext } from "../ThemeContext";

export default function ExtraWeatherInfo({
  windInfo,
  mainWeatherInfo,
  unitSystem,
}: {
  windInfo?: WindInfo;
  mainWeatherInfo?: MainWeatherInfo;
  unitSystem: UnitSystem;
}) {
  let infos: JSX.Element[] = [];

  const { Colors } = React.useContext(ThemeContext) as ThemeContextProps;

  if (windInfo) {
    infos = Object.keys(windInfo)
      .filter((k) => ["speed"].includes(k))
      .map((k) => {
        return (
          <Fragment key={k}>
            <Feather name="wind" size={40} color={Colors.PRIMARY} />
            <AppText
              type="secondary"
              otherTextStyle={{
                textAlign: "center",
                marginTop: 10,
              }}
              content={`${k}: ${utils.processSpeed(
                windInfo[k as keyof WindInfo],
                unitSystem
              )} ${unitSystem === UnitSystem.metric ? "mps" : "mph"}`}
            />
          </Fragment>
        );
      });
  }

  if (mainWeatherInfo) {
    infos = Object.keys(mainWeatherInfo)
      .filter((k) => ["humidity"].includes(k))
      .map((k) => {
        return (
          <Fragment key={k}>
            <Entypo name="water" size={40} color={Colors.PRIMARY} />
            <AppText
              otherTextStyle={{ textAlign: "center", marginTop: 10 }}
              type="secondary"
              content={`${k}: ${mainWeatherInfo[k as keyof MainWeatherInfo]}%`}
            />
          </Fragment>
        );
      });
  }

  return infos.length === 0 ? null : (
    <Container size={6} direction="column" children={infos} />
  );
}
