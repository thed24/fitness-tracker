import {
  FlatList,
  IInputProps,
  Input,
  Pressable,
  Text,
  useTheme,
  View,
} from "native-base";
import React, { useMemo } from "react";

type TextProps = Omit<IInputProps, "value" | "onChange">;
interface BaseProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  value: string;
  onChange: (value: string) => void;
}

type Props<T> = BaseProps<T> & TextProps;

export function Autocomplete<T>(props: Props<T>) {
  const theme = useTheme();
  const [showList, setShowList] = React.useState(false);
  const { data, value, onChange, keyExtractor } = props;
  const textProps = { ...props } as TextProps;

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        keyExtractor(item).toLowerCase().includes(value.toLowerCase())
      ),
    [data, value, keyExtractor]
  );

  return (
    <View>
      <View>
        <Input
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...textProps}
          value={value}
          onChange={(e) => onChange(e.nativeEvent.text)}
        />
      </View>

      {showList && (
        <View>
          {filteredData.length > 0 && (
            <FlatList
              w="full"
              zIndex={1}
              rounded="md"
              bgColor={theme.colors.white}
              position="absolute"
              data={filteredData}
              renderItem={({ item }) => (
                <Pressable onPress={() => onChange(keyExtractor(item))}>
                  <Text fontWeight="bold" color={theme.colors.gray[400]}>
                    {keyExtractor(item)}
                  </Text>
                </Pressable>
              )}
              keyExtractor={keyExtractor}
            />
          )}
        </View>
      )}
    </View>
  );
}
