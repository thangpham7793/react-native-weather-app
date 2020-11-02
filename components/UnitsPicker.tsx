import React from "react";
import { View, StyleSheet, Platform } from "react-native";
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
    <View style={styles.pickerWrapper}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 100,
    height: 100,
  },
  pickerWrapper: {
    alignSelf: "flex-start",
    ...Platform.select({
      ios: {
        marginTop: -60,
        marginLeft: 10,
      },
      android: {
        marginLeft: 20,
      },
    }),
  },
  item: {
    color: Colors.SECONDARY,
    fontSize: 15,
  },
});
