import { useTheme } from "native-base";
import React, { JSXElementConstructor, ReactElement, useState } from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BaseCarousel from "react-native-reanimated-carousel";

interface Props {
    items: any[];
    renderItem: (item: any, index: number) => ReactElement<any, string | JSXElementConstructor<any>>;
    defaultIndex?: number | undefined;
}

export function Carousel({ renderItem, items, defaultIndex = undefined }: Props) {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(items.length - 1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BaseCarousel
        loop={false}
        vertical
        pagingEnabled
        width={width}
        height={height}
        scrollAnimationDuration={500}
        data={items}
        defaultIndex={defaultIndex}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.90,
          parallaxScrollingOffset: 375,
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </GestureHandlerRootView>
  );
}
