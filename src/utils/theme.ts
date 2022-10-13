import {
  Button,
  Divider,
  Text,
  extendTheme,
  Heading,
  Card,
  Modal,
} from 'native-base';
import React from 'react';

export const createTheme = (darkMode: boolean) => {
  const theme = extendTheme({
    config: {
      initialColorMode: darkMode ? 'dark' : 'light',
    },
    colors: {
      primary: {
        50: darkMode ? '#f3e8ff' : '#e3f2fd',
        100: darkMode ? '#e0ccff' : '#bbdefb',
        200: darkMode ? '#ccaaff' : '#90caf9',
        300: darkMode ? '#b98dff' : '#64b5f6',
        400: darkMode ? '#a66dff' : '#42a5f5',
        500: darkMode ? '#934dff' : '#2196f3',
        600: darkMode ? '#7f2dff' : '#1e88e5',
        700: darkMode ? '#6b0dff' : '#1976d2',
        800: darkMode ? '#570dff' : '#1565c0',
        900: darkMode ? '#430dff' : '#0d47a1',
      },
      gray: {
        100: darkMode ? '#212121' : '#f5f7f9',
        200: darkMode ? '#2c2c2c' : '#e4e7eb',
        300: darkMode ? '#3a3a3a' : '#cbd2d9',
        400: darkMode ? '#4a4a4a' : '#9aa5b1',
        500: darkMode ? '#5a5a5a' : '#7b8794',
        600: darkMode ? '#6a6a6a' : '#616e7c',
        700: darkMode ? '#7a7a7a' : '#52606d',
        800: darkMode ? '#8a8a8a' : '#3e4c59',
        900: darkMode ? '#9a9a9a' : '#323f4b',
      },
      white: darkMode ? '#9a9a9a' : '#fafafa',
    },
    components: {
      Heading: {
        baseStyle: (props: any) =>
          ({
            _light: {
              color: 'black',
            },
            _dark: {
              color: 'black',
            },
          } as React.ComponentProps<typeof Heading>),
      },
      Text: {
        baseStyle: (props: any) =>
          ({
            _light: {
              color: 'black',
            },
            _dark: {
              color: 'black',
            },
          } as React.ComponentProps<typeof Text>),
      },
      Card: {
        baseStyle: (props: any) =>
          ({
            _light: {
              backgroundColor: 'white',
              rounded: 'lg',
              shadow: 2,
              shadowColor: 'gray.300',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 2,
              p: 4,
            },
            _dark: {
              backgroundColor: 'gray.900',
              rounded: 'lg',
              shadow: 2,
              shadowColor: 'gray.300',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 2,
              p: 4,
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
            _disabled: {
              backgroundColor: 'gray.400',
            },
          } as React.ComponentProps<typeof Button>),
      },
      Modal: {
        baseStyle: (props: any) =>
          ({
            _backdropFade: 0.5,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            _backdrop: {
              backgroundColor: 'black',
            },
          } as React.ComponentProps<typeof Modal>),
      },
    },
    fontConfig: {
      Roboto: {
        100: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        200: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        300: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        400: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        500: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        600: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        700: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        800: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
        900: {
          normal: 'JakartaSans',
          italic: 'JakartaSansItalic',
        },
      },
    },
    fonts: {
      heading: 'JakartaSans',
      body: 'JakartaSans',
      mono: 'JakartaSans',
    },
  });
  return theme;
};
