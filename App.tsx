import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import WeatherService from "./WeatherService";
import { UnitSystem } from "./types";
import WeatherInfoView from "./components/WeatherInfoView";
import UnitsPicker from "./components/UnitsPicker";

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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
      <View style={styles.main}>
        {(!errorMessage && !currentWeather && (
          <Text>Fetching Weather Data</Text>
        )) ||
          (errorMessage ? (
            <Text>{errorMessage}</Text>
          ) : (
            <>
              <WeatherInfoView
                unitSystem={unitSystem}
                weatherInfo={currentWeather.weather[0]}
                mainInfo={currentWeather.main}
                name={currentWeather.name}
              />
            </>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
