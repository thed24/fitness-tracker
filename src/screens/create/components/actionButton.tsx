import { Text, Button } from "native-base"
import React from "react"

interface BaseProps {
    title: string
}

type Props = BaseProps & Omit<React.ComponentProps<typeof Button>, "children">

export function ActionButton({ title, ...rest }: Props) {
    return (
        <Button p={-6} my={2} w={125} {...rest}>
            <Text textAlign="center" p={1} fontSize="2xs">{title}</Text>
        </Button>
    )
}