/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
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
  const textProps = useMemo(() => {
    const { data: _, value: __, onChange: ___, ...rest } = props;
    return rest;
  }, [props]);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        keyExtractor(item).toLowerCase().includes(value.toLowerCase()) && keyExtractor(item).toLowerCase() !== value.toLowerCase()
      ),
    [data, value, keyExtractor]
  );

  return (
    <View {...textProps}>
      <View>
        <Input
          {...textProps}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          value={value}
          onChange={(e) => onChange(e.nativeEvent.text)}
        />
      </View>

      {showList && (
        <Box>
          {filteredData.length > 0 && (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <Pressable zIndex={1} onTouchStart={() => onChange(keyExtractor(item))}>
                  <Text
                    marginLeft={3}
                    fontSize={14}
                    fontWeight="bold"
                    color={theme.colors.gray[400]}
                  >
                    {keyExtractor(item)}
                  </Text>
                </Pressable>
              )}
              keyExtractor={keyExtractor}
            />
          )}
        </Box>
      )}
    </View>
  );
}