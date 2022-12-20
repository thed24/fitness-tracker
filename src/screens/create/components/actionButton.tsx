import { Button } from "components"
import { Text } from "native-base"
import React from "react"

interface BaseProps {
    title: string
}

type Props = BaseProps & Omit<React.ComponentProps<typeof Button>, "children">

export function ActionButton({ title, ...rest }: Props) {
    return (
        <Button {...rest} variant="link">
            <Text textAlign="center" color="black" fontSize="2xs">{title}</Text>
        </Button>
    )
}