import React from "react";
import { Avatar as AvatarBase, useTheme } from "native-base";
import { useStore } from "store";

type Props = React.ComponentProps<typeof AvatarBase>;

export function Avatar({ ...props }: Props) {
  const theme = useTheme();
  const { user } = useStore();

  return (
    <AvatarBase
      size="xl"
      style={{
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.primary[500],
        borderWidth: 2,
      }}
      textAlign="center"
      borderColor={theme.colors.gray[200]}
      borderWidth={2}
      _text={{
        color: theme.colors.primary[500],
        fontSize: "3xl",
        fontWeight: "bold",
      }}
      {...props}
    >
      {user?.username[0]}
    </AvatarBase>
  );
}
