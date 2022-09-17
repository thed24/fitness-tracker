import { Box, useTheme } from "native-base";
import React, { JSXElementConstructor, ReactElement } from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BaseCarousel from "react-native-reanimated-carousel";
import PaginationDot from "react-native-animated-pagination-dot";

interface Props {
    items: any[];
    renderItem: (item: any, index: number) => ReactElement<any, string | JSXElementConstructor<any>>;
}

export function Carousel({ renderItem, items }: Props) {
  const theme = useTheme();
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = React.useState(items.length - 1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BaseCarousel
        loop={false}
        pagingEnabled
        width={width}
        height={width}
        scrollAnimationDuration={1000}
        data={items}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
      <Box marginLeft="auto" marginRight="auto">
        <PaginationDot
          activeDotColor={theme.colors.primary[500]}
          curPage={activeIndex}
          maxPage={items.length}
        />
      </Box>
    </GestureHandlerRootView>
  );
}
