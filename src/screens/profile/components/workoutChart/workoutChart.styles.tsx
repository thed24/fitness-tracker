import styled from "styled-components/native";
import { Select } from "native-base";

export const Dropdown = styled(Select)`
    
`;

Dropdown.defaultProps = {
    variant: "unstyled",
    textAlign: "right",
    py: -2,
    backgroundColor: "transparent",
    _text: {
        fontSize: "sm",
        color: "white",
        highlight: false,
    },
};
