import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../types";

export default function AppIcon({
  icon,
  ...props
}: {
  icon?: JSX.Element;
  name: string;
  size: number;
  color: Colors;
}) {
  return <Ionicons {...props} />;
}
