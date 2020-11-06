import React from "react";
import { View, Text, TextStyle } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { Colors, ThemeContextProps } from "../types";

export default function AppText({
  content,
  otherTextStyle = {},
  type = "primary",
}: {
  otherTextStyle?: TextStyle;
  content: string;
  type?: "primary" | "secondary";
}) {
  const { Colors } = React.useContext(ThemeContext) as ThemeContextProps;

  const textStyles: {
    primary: TextStyle;
    secondary: TextStyle;
  } = {
    primary: {
      fontSize: 40,
      color: Colors.PRIMARY,
    },
    secondary: {
      fontSize: 20,
      color: Colors.SECONDARY,
      fontWeight: "500",
    },
  };

  return (
    <View>
      <Text
        style={{
          textTransform: "capitalize",
          ...textStyles[type],
          ...otherTextStyle,
        }}
      >
        {content}
      </Text>
    </View>
  );
}
