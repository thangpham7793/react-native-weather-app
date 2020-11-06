import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform } from "react-native";
import * as Location from "expo-location";
import WeatherService from "./WeatherService";
import { ThemeContextProps, UnitSystem } from "./types";
import WeatherInfoView from "./components/WeatherInfoView";
import UnitsPicker from "./components/UnitsPicker";
import Container from "./components/Container";
import ExtraWeatherInfo from "./components/ExtraWeatherInfo";
import ReloadButton from "./components/ReloadButton";
import AppIcon from "./components/AppIcon";
import AppText from "./components/AppText";
import { ThemeContext } from "./ThemeContext";

export default function WeatherApp() {
  //https://codewithstyle.info/Using-React-useState-hook-with-TypeScript/
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.metric);

  const { Colors, onColorModeSwitched } = React.useContext(
    ThemeContext
  ) as ThemeContextProps;

  //similar to onInit in Angular
  useEffect(() => {
    load();
  }, []);

  async function load() {
    setCurrentWeather(null);
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        let result = await WeatherService.getWeather(
          { latitude, longitude },
          unitSystem
        );

        if (result) {
          //console.log(result);
          return setCurrentWeather(result);
        } else {
          setErrorMessage(`Service Unavailable`);
        }

        return;
      } else {
        setErrorMessage(`You need to enable location to use this app!`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <Container
      size={12}
      otherViewStyle={{
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <StatusBar key={"status-bar"} style="auto" />
      <Container key={"upper-wrapper"} direction="row" size={2}>
        <Container
          key={"unit-picker"}
          size={6}
          direction="row"
          otherViewStyle={{
            justifyContent: "flex-start",
            marginLeft: 20,
            alignItems: "center",
          }}
          children={
            <UnitsPicker
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
            />
          }
        />

        <Container
          key={"reload-button"}
          size={6}
          direction="row"
          otherViewStyle={{
            justifyContent: "flex-end",
            marginRight: 30,
          }}
          children={
            <ReloadButton
              icon={
                <AppIcon
                  name="ios-refresh"
                  size={20}
                  color={Colors.SECONDARY}
                />
              }
              reFetchWeatherData={() => load()}
            />
          }
        />
      </Container>
      <Container key="main-content" size={7}>
        {(!errorMessage && !currentWeather && (
          <>
            <AppText
              type="secondary"
              content="Fetching Weather Data"
              otherTextStyle={{ marginBottom: 20 }}
            />
            <ActivityIndicator
              size={Platform.OS === "android" ? 40 : "large"}
              color={Colors.PRIMARY}
            />
          </>
        )) ||
          (errorMessage ? (
            <AppText type="secondary" content={errorMessage} />
          ) : (
            <WeatherInfoView
              unitSystem={unitSystem}
              weatherInfo={currentWeather.weather[0]}
              mainInfo={currentWeather.main}
              name={currentWeather.name}
            />
          ))}
      </Container>
      <Container
        key="extra-info-wrapper"
        direction="row"
        size={3}
        children={[
          <ExtraWeatherInfo
            key={"wind"}
            windInfo={currentWeather?.wind}
            unitSystem={unitSystem}
          />,
          <ExtraWeatherInfo
            key={"main"}
            mainWeatherInfo={currentWeather?.main}
            unitSystem={unitSystem}
          />,
        ]}
      />
    </Container>
  );
}
