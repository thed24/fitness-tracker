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
      source={{
        uri: "https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png",
      }}
      style={{
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.primary[500],
        borderWidth: 2,
      }}
      textAlign="center"
      borderColor={theme.colors.gray[200]}
      borderWidth={2}
      {...props}
    >
      {user?.username[0]}
    </AvatarBase>
  );
}
