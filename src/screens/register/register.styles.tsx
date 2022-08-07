import styled from "styled-components/native";
import { VStack } from "native-base";

export const Container = styled(VStack)`
    align-items: center;
    padding: 20px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
`;

Container.defaultProps = {
    space: 4,
    w: "3/4"
};
