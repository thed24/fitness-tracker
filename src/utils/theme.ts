import { extendTheme } from "native-base";

const config = {
  useSystemColorMode: true
};

export const theme = extendTheme({
  ...config,
  colors: {
    gray: {
      100: "#f5f7f9"
    }
  }
});
