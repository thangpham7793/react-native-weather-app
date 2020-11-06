import React from "react";
import { TouchableOpacity } from "react-native";

export default function BaseIconButton({
  onPress,
  icon = null,
}: {
  onPress: () => void;
  icon: null | JSX.Element;
}) {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
}
