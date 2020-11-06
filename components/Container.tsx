import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { ThemeContextProps } from "../types";

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
  const { Colors } = React.useContext(ThemeContext) as ThemeContextProps;

  const styles = StyleSheet.create({
    container: {
      flex: size / 12,
      flexDirection: direction,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.BACKGROUND,
    },
  });

  return (
    <View style={{ ...styles.container, ...otherViewStyle }}>{children}</View>
  );
}
