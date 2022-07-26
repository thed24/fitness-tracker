import {
  Input as BaseInput,
  Pressable,
  Text,
  useTheme,
  View,
} from 'native-base';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import { Input } from '../input/input';

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
  const [showList, setShowList] = useState(false);

  const { width } = Dimensions.get("screen");

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
          placeholder={textProps?.placeholder || 'Search'}
          accessibilityLabel={`${value} input`}
          type="text"
          placeholderTextColor={theme.colors.gray[400]}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          value={value}
          onChangeText={(e) => onChange(e)}
        />
      </View>

      {showList && filteredData.length > 0 && (
        <SafeAreaView>
          <FlatList
            keyExtractor={keyExtractor}
            data={limitedData}
            scrollEnabled={false}
            nestedScrollEnabled={false}
            renderItem={({ item }) => {
              const key = keyExtractor(item);
              return (
                <Pressable
                  zIndex={1}
                  ml={2}
                  onTouchStart={() => onChange(key)}
                >
                  <Text
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
        </SafeAreaView>
      )}
    </View>
  );
}
