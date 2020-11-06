import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export default function Container({
  children,
  size = 12,
  direction = "column",
  otherViewStyle = {},
}: {
  children: JSX.Element[] | JSX.Element;
  size?: number;
  direction?: "row" | "column" | "row-reverse";
  otherViewStyle?: Partial<ViewStyle>;
}) {
  const styles = StyleSheet.create({
    container: {
      flex: size / 12,
      flexDirection: direction,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={{ ...styles.container, ...otherViewStyle }}>{children}</View>
  );
}
