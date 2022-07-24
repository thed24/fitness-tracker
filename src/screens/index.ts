import { NavigationProp } from '@react-navigation/native';

export { HomeScreen } from './home/home';
export { ProfileScreen } from './profile/profile';
export { LoginScreen } from './login/login';
export { RegisterScreen } from './register/register';

export interface NavigationProps {
    navigation: NavigationProp<any, any>;
}
