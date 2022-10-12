import {
  FlatList,
  Input as BaseInput,
  Pressable,
  Text,
  useTheme,
  View,
} from "native-base";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native";
import { Input } from "../input/input";

interface BaseProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  value: string;
  onChange: (value: string) => void;
}

type Props<T> = BaseProps<T> &
  Omit<React.ComponentProps<typeof BaseInput>, keyof BaseProps<T>>;

export function Autocomplete<T>(props: Props<T>) {
  const { data, value, onChange, keyExtractor } = props;
  const [showList, setShowList] = React.useState(false);

  const theme = useTheme();

  const textProps = useMemo(() => {
    const { data: _, value: __, onChange: ___, ...rest } = props;
    return rest;
  }, [props]);

  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          keyExtractor(item).toLowerCase().includes(value.toLowerCase()) &&
          keyExtractor(item).toLowerCase() !== value.toLowerCase()
      ),
    [data, value, keyExtractor]
  );

  const limitedData = useMemo(
    () =>
      filteredData.length > 5
        ? filteredData.slice(0, 5)
        : filteredData.slice(0, filteredData.length),
    [filteredData]
  );

  return (
    <View {...textProps}>
      <View>
        <Input
          {...textProps}
          placeholderTextColor={theme.colors.gray[400]}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          value={value}
          onChange={(e) => onChange(e.nativeEvent.text)}
        />
      </View>

      {showList && (
        <SafeAreaView>
          {filteredData.length > 0 && (
            <FlatList
              ml={2}
              keyExtractor={keyExtractor}
              data={limitedData}
              renderItem={({ item }) => {
                const key = keyExtractor(item);
                return (
                  <Pressable
                    key={`${key}-pressable`}
                    zIndex={1}
                    onTouchStart={() => onChange(key)}
                  >
                    <Text
                      key={`${key}-text`}
                      fontSize={14}
                      fontWeight="bold"
                      color={theme.colors.gray[400]}
                    >
                      {key}
                    </Text>
                  </Pressable>
                );
              }}
            />
          )}
        </SafeAreaView>
      )}
    </View>
  );
}
