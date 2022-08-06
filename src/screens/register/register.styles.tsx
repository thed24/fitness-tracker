import styled from "styled-components/native";
import { VStack } from "native-base";

export const Container = styled(VStack)`
    align-items: center;
    margin-top: 10;
    margin-left: auto;
    margin-right: auto;
`;

Container.defaultProps = {
    space: 4,
    w: "3/4"
};
