import React, { useMemo, useState } from 'react';
import { Pressable, Image, useTheme } from 'native-base';
import { Badge, Image as ImageType } from 'types';
import { useGetUser } from 'api';
import { ImagePicker } from '../imagePicker/imagePicker';

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  callback: (image: ImageType) => void;
  badge?: Badge;
  editable?: boolean;
}

export function Avatar({ size, callback, badge, editable = false }: Props) {
  const [image, setImage] = useState<ImageType | undefined>(undefined);
  const theme = useTheme();

  const { data: user } = useGetUser();

  const placeholderName = user?.username ?? 'User';
  const avatar = image ?? user?.avatar;
  const userBadge = badge ?? user?.badge;

  const width = theme.sizes[size] / 2.5;
  const height = theme.sizes[size] / 2.5;

  const avatarImage = useMemo(() => {
    const style = {
      width,
      height,
      borderRadius: width / 2,
      borderWidth: 2,
      borderColor: theme.colors.primary[500],
    };

    let tempImage = null;

    if (avatar) {
      tempImage = (
        <Image
          style={style}
          alt={`Avatar for ${placeholderName}`}
          source={{
            uri: `data:image/${avatar.fileExtension};base64,${avatar.bytes}`,
          }}
        />
      );
    } else {
      tempImage = (
        <Image
          style={style}
          alt={`Avatar for ${placeholderName}`}
          source={{
            uri: `https://ui-avatars.com/api/?name=${placeholderName}&size=300`,
          }}
        />
      );
    }

    return (
      <ImagePicker
        disabled={!editable}
        mt={4}
        mb={1}
        callbacks={[callback, setImage]}
        accessibilityLabel="Change avatar"
      >
        {tempImage}
      </ImagePicker>
    );
  }, [avatar, callback, editable, height, placeholderName, theme.colors.primary, width]);

  const badgeImage = useMemo(() => {
    if (!userBadge) {
      return null;
    }

    const style = {
      width: 50,
      height: 50,
      top: 10,
      right: -75,
      borderRadius: width / 2,
      borderWidth: 2,
      borderColor: theme.colors.primary[500],
    };

    return (
      <Pressable zIndex={1} bgColor="transparent" onPress={() => {}}>
        <Image
          style={style}
          position="absolute"
          alt={`Badge for ${placeholderName}`}
          source={{
            uri: `data:image/${userBadge.image.fileExtension};base64,${userBadge.image.bytes}`
          }}
        />
      </Pressable>
    );
  }, [placeholderName, theme.colors.primary, userBadge, width]);

  return (
    <>
      {badgeImage}
      {avatarImage}
    </>
  );
}
