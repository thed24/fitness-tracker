import styled from "styled-components/native";
import { ScrollView, View } from "native-base";

export const Container = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
`;

export const ScrollableContainer = styled(ScrollView)`
  flex: 1;
  width: 100%;
  height: 100%;
  text-align: center;
`;
