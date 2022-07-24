/* eslint-disable react/require-default-props */
import * as React from 'react';
import {
  Image,
  View,
  Text,
  StyleProp,
  ViewStyle,
  StatusBar,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TextInput from 'react-native-text-input-interactive';
import styles from './authForm.style';

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type CustomImageStyleProp =
  | StyleProp<ImageStyle>
  | Array<StyleProp<ImageStyle>>;
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

interface Props {
  signupText?: string;
  disableDivider?: boolean;
  logoImageSource: any;
  emailPlaceholder?: string;
  passwordPlaceholer?: string;
  disableSignup?: boolean;
  style?: CustomStyleProp;
  dividerStyle?: CustomStyleProp;
  logoImageStyle?: CustomImageStyleProp;
  textInputContainerStyle?: CustomStyleProp;
  loginButtonStyle?: CustomStyleProp;
  loginTextStyle?: CustomTextStyleProp;
  signupStyle?: CustomStyleProp;
  signupTextStyle?: CustomTextStyleProp;
  children?: any;
  namePlaceholder?: string;
  mainText: string;
  onLoginPress: () => void;
  onSignupPress: () => void;
  onNameChange?: (value: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

export function AuthForm({
  style,
  mainText,
  dividerStyle,
  logoImageStyle,
  loginTextStyle,
  loginButtonStyle,
  signupTextStyle,
  signupStyle,
  textInputContainerStyle,
  signupText = 'Create an account',
  disableDivider,
  logoImageSource,
  onLoginPress,
  onSignupPress,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  namePlaceholder = 'Name',
  emailPlaceholder = 'Email',
  passwordPlaceholer = 'Password',
  disableSignup = false,
  children,
}: Props) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" />

      <Image
        resizeMode="contain"
        source={logoImageSource}
        style={[styles.logoImageStyle, logoImageStyle]}
      />

      <View style={[styles.textInputContainer, textInputContainerStyle]}>
        <TextInput placeholder={emailPlaceholder} onChangeText={onEmailChange} />
        <View style={styles.passwordTextInputContainer}>
          <TextInput
            placeholder={passwordPlaceholer}
            secureTextEntry
            onChangeText={onPasswordChange}
          />
        </View>
        {onNameChange && (
        <View style={styles.nameTextInputContainer}>
          <TextInput
            placeholder={namePlaceholder}
            onChangeText={onNameChange}
          />
        </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.loginButtonStyle, loginButtonStyle]}
        onPress={onLoginPress}
      >
        <Text style={[styles.loginTextStyle, loginTextStyle]}>{mainText}</Text>
      </TouchableOpacity>

      {!disableSignup && (
      <TouchableOpacity
        style={[styles.signupStyle, signupStyle]}
        onPress={onSignupPress}
      >
        <Text style={[styles.signupTextStyle, signupTextStyle]}>
          {signupText}
        </Text>
      </TouchableOpacity>
      )}

      {!disableDivider && <View style={[styles.dividerStyle, dividerStyle]} />}

      <View style={styles.socialLoginContainer}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export default AuthForm;
