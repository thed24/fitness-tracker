import styled from "styled-components/native";
import { ScrollView, View } from "native-base";

export const Content = styled(ScrollView)`
`;

Content.defaultProps = {
    nestedScrollEnabled: true,
    contentContainerStyle: {
        flexGrow: 1,
    },
};

export const Container = styled(View)`
`;
