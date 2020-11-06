import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import WeatherService from "./WeatherService";
import { MainWeatherInfo, UnitSystem, WindInfo } from "./types";
import WeatherInfoView from "./components/WeatherInfoView";
import UnitsPicker from "./components/UnitsPicker";
import Container from "./components/Container";
import ExtraWeatherInfo from "./components/ExtraWeatherInfo";
import ReloadButton from "./components/ReloadButton";

export default function App() {
  //https://codewithstyle.info/Using-React-useState-hook-with-TypeScript/
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.metric);

  //similar to onInit in Angular
  useEffect(() => {
    load();
  }, [unitSystem]);

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
          console.log(result);
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
    <Container size={12}>
      <StatusBar style="auto" />
      <Container direction="row" size={2}>
        <Container
          size={6}
          direction="row"
          otherViewStyle={{
            justifyContent: "flex-start",
            ...Platform.select({
              ios: {
                marginTop: -60,
                marginLeft: 10,
              },
              android: {
                marginLeft: 20,
              },
            }),
          }}
        >
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
        </Container>
        <Container
          size={6}
          direction="row"
          otherViewStyle={{
            justifyContent: "flex-end",
            marginRight: 20,
          }}
          children={<ReloadButton reFetchWeatherData={() => load()} />}
        />
      </Container>
      <View style={styles.main}>
        {(!errorMessage && !currentWeather && (
          <Text>Fetching Weather Data</Text>
        )) ||
          (errorMessage ? (
            <Text>{errorMessage}</Text>
          ) : (
            <WeatherInfoView
              unitSystem={unitSystem}
              weatherInfo={currentWeather.weather[0]}
              mainInfo={currentWeather.main}
              name={currentWeather.name}
            />
          ))}
      </View>
      <Container
        direction="row"
        size={3}
        children={[
          <ExtraWeatherInfo windInfo={currentWeather?.wind} />,
          <ExtraWeatherInfo mainWeatherInfo={currentWeather?.main} />,
        ]}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
