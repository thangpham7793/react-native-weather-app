import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { ThemeContextProps, UnitSystem } from "../types";
import { ThemeContext } from "../ThemeContext";

export default function UnitsPicker({
  unitSystem,
  setUnitSystem,
}: {
  unitSystem: UnitSystem;
  setUnitSystem: React.Dispatch<React.SetStateAction<UnitSystem>>;
}) {
  const { Colors } = React.useContext(ThemeContext) as ThemeContextProps;

  return (
    <Picker
      selectedValue={unitSystem}
      style={styles.picker}
      mode={"dropdown"}
      onValueChange={(item) => setUnitSystem(item as UnitSystem)}
      //only works on IOS
      itemStyle={{
        fontSize: 15,
        color: Colors.SECONDARY,
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <Picker.Item value={UnitSystem.metric} label={"°C"} />
      <Picker.Item value={UnitSystem.imperial} label={"°F"} />
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 100,
    height: 100,
    ...Platform.select({
      ios: { marginBottom: 120 },
    }),
  },
});
