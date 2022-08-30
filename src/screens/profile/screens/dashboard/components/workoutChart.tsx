import { StyleSheet, View } from "react-native";
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
} from "victory-native";
import React, { useMemo } from "react";
import { useTheme } from "native-base";
import { Defs, LinearGradient, Stop } from "react-native-svg";

interface Props {
  data: Record<number, number>;
}

export function WorkoutChart({ data }: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.gray[100],
    },
  });

  const chartData = useMemo(
    () =>
      Object.entries(data).map(([key, value]) => ({
        x: key,
        y: value,
      })),
    [data]
  );

  const highestValue = useMemo(() => Math.max(...Object.values(data)), [data]);
  const length = useMemo(() => Object.keys(data).length, [data]);

  return (
    <View style={styles.container}>
      <VictoryChart
        animate={{ duration: 50 }}
        width={350}
        theme={VictoryTheme.material}
      >
        <Defs>
          {/*
          // @ts-ignore */}
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={theme.colors.primary[700]} />
            <Stop offset="100%" stopColor={theme.colors.primary[100]} />
          </LinearGradient>
        </Defs>
        <VictoryArea
          interpolation="natural"
          domain={{ x: [1, length], y: [0, highestValue * 1.2] }}
          style={{
            data: {
              fill: "url(#gradient)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              strokeWidth: 2,
              stroke: theme.colors.primary[700],
            },
          }}
          data={chartData}
        />
        <VictoryAxis
          dependentAxis
          style={{ axis: { stroke: theme.colors.gray[500] } }}
        />
        <VictoryAxis
          label="Sessions"
          style={{ axis: { stroke: theme.colors.gray[500] } }}
        />
      </VictoryChart>
    </View>
  );
}
