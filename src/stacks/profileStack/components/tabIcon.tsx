import { useTheme } from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export type IoniconsIconsNames = keyof typeof Ionicons.glyphMap;

interface Props {
    name: IoniconsIconsNames;
    focused: boolean;
}

export function TabIcon({ focused, name }: Props) {
    const theme = useTheme();
    const colors = [theme.colors.gray[300], theme.colors.primary[500]];

    return (
        <Ionicons
            style={{
                width: 30,
                height: 30,
                position: 'absolute',
                top: 2
            }}
            name={name}
            size={30}
            color={colors[focused ? 1 : 0]}
        />
    );
}
