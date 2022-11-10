import {
  Progress,
  Button,
  Card,
  Divider,
  extendTheme,
  Select,
  View,
} from 'native-base';
import React from 'react';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const nativeTheme = extendTheme({
  colors: {
    primary: {
      '50': '#a6d7ff',
      '100': '#82c7ff',
      '200': '#61b6fb',
      '300': '#43a5f5',
      '400': '#2196f3',
      '500': '#148aea',
      '600': '#187dd0',
      '700': '#1c71b7',
      '800': '#1e659f',
      '900': '#1f5988',
    },
    gray: {
      100: '#f5f7f9',
      200: '#e4e7eb',
      300: '#cbd2d9',
      400: '#9aa5b1',
      500: '#7b8794',
      600: '#616e7c',
      700: '#52606d',
      800: '#3e4c59',
      900: '#323f4b',
    },
    white: '#fafafa',
  },
  components: {
    Card: {
      baseStyle: (props: any) =>
        ({
          rounded: 'lg',
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          p: 4,
          _light: {
            backgroundColor: 'white',
          },
          _dark: {
            backgroundColor: 'gray.900',
          },
        } as React.ComponentProps<typeof Card>),
    },
    Divider: {
      baseStyle: (props: any) =>
        ({
          backgroundColor: 'gray.400',
        } as React.ComponentProps<typeof Divider>),
    },
    Button: {
      baseStyle: (props: any) =>
        ({
          borderRadius: 10,
          _text: {
            color: 'white',
          },
          _pressed: {
            backgroundColor: 'primary.600',
          },
        } as React.ComponentProps<typeof Button>),
    },
    View: {
      baseStyle: (props: any) =>
        ({
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        } as React.ComponentProps<typeof View>),
    },
    Select: {
      baseStyle: (props: any) =>
        ({
          _text: {
            color: 'black',
          },
        } as React.ComponentProps<typeof Select>),
    },
    Progress: {
      baseStyle: (props: any) =>
        ({
          mt: 3,
          size: 'xl',
          rounded: 'full',
          _light: {
            backgroundColor: 'gray.300',
          },
          _dark: {
            backgroundColor: 'gray.700',
          },
        } as React.ComponentProps<typeof Progress>),
    },
    Text: {
      baseStyle: {
        _dark: {
          color: '#fafafa',
        },
      },
    },
    Input: {
      baseStyle: {
        _dark: {
          backgroundColor: 'gray.900',
        },
        _light: {
          backgroundColor: 'gray.300',
        },
      },
    },
    Heading: {
      baseStyle: {
        _dark: {
          color: '#fafafa',
        },
      },
    },
  },
  typography: {
    fonts: {
      heading: 'JakartaSans',
      body: 'JakartaSans',
      mono: 'JakartaSans',
    },
  },
});

export const paperTheme = {
  ...DefaultTheme,
  roundness: 10,
  version: 3,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(33,150,243)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(209, 228, 255)',
    onPrimaryContainer: 'rgb(0, 29, 54)',
    secondary: 'rgb(83, 95, 112)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(215, 227, 247)',
    onSecondaryContainer: 'rgb(16, 28, 43)',
    tertiary: 'rgb(107, 87, 120)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(242, 218, 255)',
    onTertiaryContainer: 'rgb(37, 20, 49)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 252, 255)',
    onBackground: 'rgb(26, 28, 30)',
    surface: 'rgb(253, 252, 255)',
    onSurface: 'rgb(26, 28, 30)',
    surfaceVariant: 'rgb(223, 226, 235)',
    onSurfaceVariant: 'rgb(67, 71, 78)',
    outline: 'rgb(115, 119, 127)',
    outlineVariant: 'rgb(195, 199, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 48, 51)',
    inverseOnSurface: 'rgb(241, 240, 244)',
    inversePrimary: 'rgb(158, 202, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(240, 244, 250)',
      level2: 'rgb(233, 240, 248)',
      level3: 'rgb(225, 235, 245)',
      level4: 'rgb(223, 233, 244)',
      level5: 'rgb(218, 230, 242)',
    },
    surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    backdrop: 'rgba(44, 49, 55, 0.4)',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'JakartaSans',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'JakartaSans',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'JakartaSans',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'JakartaSans',
      fontWeight: 'normal',
    },
  },
};
