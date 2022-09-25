import {
  FlatList,
  Input,
  Pressable,
  Text,
  useTheme,
  View,
} from "native-base";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native";

interface BaseProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  value: string;
  onChange: (value: string) => void;
}

type Props<T> = BaseProps<T> & React.ComponentProps<typeof Input>;

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

  const limitedData = useMemo(() => filteredData.slice(0, 5), [filteredData]);

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
        <SafeAreaView>
          {filteredData.length > 0 && (
            <FlatList
              style={{ marginLeft: 3 }}
              data={limitedData}
              renderItem={({ item }) => (
                <Pressable
                  key={`${keyExtractor(item)}-pressable`}
                  zIndex={1}
                  onTouchStart={() => onChange(keyExtractor(item))}
                >
                  <Text
                    key={`${keyExtractor(item)}-text`}
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
        </SafeAreaView>
      )}
    </View>
  );
}
