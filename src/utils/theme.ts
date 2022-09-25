import { extendTheme } from "native-base";

export const createTheme = (darkMode: boolean) =>
  extendTheme({
    config: {
      initialColorMode: darkMode ? "dark" : "light"
    },
    colors: {
      primary: {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1"
      },
      gray: {
        100: "#f5f7f9"
      }
    },
    fontConfig: {
      Roboto: {
        100: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        200: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        300: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        400: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        500: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        600: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        700: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        800: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        },
        900: {
          normal: "JakartaSans",
          italic: "JakartaSansItalic"
        }
      }
    },
    fonts: {
      heading: "JakartaSans",
      body: "JakartaSans",
      mono: "JakartaSans"
    }
  });
