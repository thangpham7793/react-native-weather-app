import React, { useState, createContext } from "react";
import { ThemeContextProps, DARK, LIGHT } from "./types";

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export default function ThemeContextProvider(props: { children: JSX.Element }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  function onColorModeSwitched() {
    setIsDarkMode(!isDarkMode);
  }

  const AppColors: { DARK: DARK; LIGHT: LIGHT } = {
    DARK: {
      PRIMARY: "#fff",
      SECONDARY: "yellow",
      BORDER: "#dbdbdb",
      BACKGROUND: "#111",
    },
    LIGHT: {
      PRIMARY: "#ff304f",
      SECONDARY: "#002651",
      BORDER: "#dbdbdb",
      BACKGROUND: "#fff",
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        Colors: isDarkMode ? AppColors.DARK : AppColors.LIGHT,
        onColorModeSwitched,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
