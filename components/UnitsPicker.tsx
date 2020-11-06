import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { UnitSystem } from "../types";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function UnitsPicker({
  unitSystem,
  setUnitSystem,
}: {
  unitSystem: UnitSystem;
  setUnitSystem: React.Dispatch<React.SetStateAction<UnitSystem>>;
}) {
  return (
    <Picker
      selectedValue={unitSystem}
      style={styles.picker}
      mode={"dropdown"}
      onValueChange={(item) => setUnitSystem(item as UnitSystem)}
      itemStyle={styles.item}
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
      ios: { marginBottom: 100 },
    }),
  },
  item: {
    color: Colors.SECONDARY,
    fontSize: 15,
  },
});
