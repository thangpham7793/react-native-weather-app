import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { UnitSystem } from "../types";

export default function UnitsPicker({
  unitSystem,
  onValueChange,
}: {
  unitSystem: UnitSystem;
  onValueChange: (
    itemValue: React.ReactText,
    itemIndex: number
  ) => void | undefined;
}) {
  return (
    <View>
      <Picker
        selectedValue={unitSystem}
        style={styles.picker}
        mode={"dropdown"}
        onValueChange={onValueChange}
      >
        <Picker.Item value={UnitSystem.metric} label={UnitSystem.metric} />
        <Picker.Item value={UnitSystem.imperial} label={UnitSystem.imperial} />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 100,
    height: 100,
  },
});
