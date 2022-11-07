import React, { useMemo } from 'react';
import { Pressable, useTheme } from 'native-base';
import { Image } from 'react-native';
import { useStore } from 'store';
import { Badge, Image as ImageType } from 'types';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import Toast from 'react-native-toast-message';

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  callback: (image: ImageType) => void;
  badge?: Badge;
  editable?: boolean;
}

export function Avatar({ size, callback, badge, editable = false }: Props) {
  const [permissions, requestPermission] = useMediaLibraryPermissions();
  const [image, setImage] = React.useState<ImageType | undefined>(undefined);

  const theme = useTheme();
  const { user } = useStore();

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

    const pickImage = () => {
      if (permissions?.status === 'granted') {
        launchImageLibraryAsync({
          mediaTypes: MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        }).then((result) => {
          if (!result.cancelled) {
            const newImage = {
              id: 0,
              bytes: result.base64,
              name: 'avatar',
              fileExtension: result.uri.split('.').pop(),
            } as ImageType;

            setImage(newImage);
            callback(newImage);
          }
        });
      } else {
        requestPermission().then((result) => {
          if (result.status !== 'granted') {
            Toast.show({
              text1: 'Permission to access camera roll is required!',
            });
          }
        });
      }
    };

    let tempImage = null;

    if (avatar) {
      tempImage = (
        <Image
          style={style}
          accessibilityLabel={`Avatar for ${placeholderName}`}
          source={{
            uri: `data:image/${avatar.fileExtension};base64,${avatar.bytes}`,
          }}
        />
      );
    } else {
      tempImage = (
        <Image
          style={style}
          accessibilityLabel={`Avatar for ${placeholderName}`}
          source={{
            uri: `https://ui-avatars.com/api/?name=${placeholderName}&size=300`,
          }}
        />
      );
    }

    return (
      <Pressable
        onPress={editable ? pickImage : null}
        mt={4}
        mb={1}
        accessibilityLabel="Change avatar"
      >
        {tempImage}
      </Pressable>
    );
  }, [avatar, callback, editable, height, permissions?.status, placeholderName, requestPermission, theme.colors.primary, width]);

  const badgeImage = useMemo(() => {
    if (!userBadge) {
      return null;
    }

    const style = {
      width: 50,
      height: 50,
      position: 'absolute',
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
          accessibilityLabel={`Badge for ${placeholderName}`}
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
