import Animated from "react-native-reanimated";
import React from "react";
import { useTheme, View } from "native-base";

interface Props<T> {
  data: T[];
  length: number;
  animValue: Animated.SharedValue<number>;
}

export function Pagination<T>({
  data,
  length,
  animValue,
}: Props<T>) {
  const width = 10;
  const theme = useTheme();

  const paginationOrb = (index: number) => (
    <View
      key={index}
      style={{
        backgroundColor: "white",
        shadowColor: "black",
        width,
        height: width,
        borderRadius: 100,
        marginHorizontal: 2,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 100,
            backgroundColor: theme.colors.primary[500],
            flex: 1,
          },
        ]}
      />
    </View>
  )

  return (
    <View
        style={{
            flexDirection: 'row',
            marginTop: 5,
            alignSelf: 'center',
        }}
    >
        {data.map((_, index) => paginationOrb(index))}
    </View>
  );
}

