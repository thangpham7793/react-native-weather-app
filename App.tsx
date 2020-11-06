import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import WeatherService from "./WeatherService";
import { UnitSystem, Colors } from "./types";
import WeatherInfoView from "./components/WeatherInfoView";
import UnitsPicker from "./components/UnitsPicker";
import Container from "./components/Container";
import ExtraWeatherInfo from "./components/ExtraWeatherInfo";
import ReloadButton from "./components/ReloadButton";
import AppIcon from "./components/AppIcon";
import AppText from "./components/AppText";

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
            marginLeft: 20,
            alignItems: "center",
          }}
        >
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
        </Container>
        <Container
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
      <View style={styles.main}>
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
      </View>
      <Container
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

const styles = StyleSheet.create({
  main: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
