import styled from "styled-components/native";
import { Select } from "native-base";

export const Dropdown = styled(Select)`
    
`;

Dropdown.defaultProps = {
    variant: "unstyled",
    textAlign: "right",
    _text: {
        fontSize: "sm",
        color: "gray.500",
        highlight: false,
    },
};
