import styled from "styled-components/native";
import { Select } from "native-base";

export const Dropdown = styled(Select)`

`;

Dropdown.defaultProps = {
    py: -2,
    variant: "unstyled",
    textAlign: "right",
};
