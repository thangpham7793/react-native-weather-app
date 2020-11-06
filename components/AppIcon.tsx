import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Palette } from "../types";

export default function AppIcon({
  icon,
  ...props
}: {
  icon?: JSX.Element;
  name: string;
  size: number;
  color: Palette["SECONDARY"];
}) {
  return <Ionicons {...props} />;
}
