import React from "react";
import { Pressable, Toast, useTheme } from "native-base";
import { Image } from "react-native";
import { useStore } from "store";
import { Image as ImageType } from "types";
import { launchImageLibraryAsync, MediaTypeOptions, useMediaLibraryPermissions } from "expo-image-picker";

interface Props {
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  callback: (image: ImageType) => void;
}

export function Avatar({ size, callback }: Props) {
  const [permissions, requestPermission] = useMediaLibraryPermissions();
  const [image, setImage] = React.useState<ImageType | undefined>(undefined);

  const theme = useTheme();
  const { user } = useStore();

  const pickImage = () => {
    if (permissions?.status === "granted") {
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
            name: "avatar",
            fileExtension: result.uri.split(".").pop(),
          } as ImageType;

          setImage(newImage);
          callback(newImage);
        }
      });
    } else {
      requestPermission().then((result) => {
        if (result.status !== "granted") {
          Toast.show({
            title: "Permission to access camera roll is required!",
            duration: 3000,
          });
        }
      });
    }
  };

  const placeholderName = user?.username ?? "User";
  const avatar = image ?? user?.avatar;

  const width = theme.sizes[size] / 2.5;
  const height = theme.sizes[size] / 2.5;

  const style = {
    width,
    height,
    borderRadius: width / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
  };

  return (
    <Pressable onPress={pickImage} mt={4} mb={1} accessibilityLabel="Change avatar">
      {avatar ? (
        <Image
          style={style}
          source={{
            uri: `data:image/${avatar.fileExtension};base64,${avatar.bytes}`,
          }}
        />
      ) : (
        <Image
          style={style}
          source={{
            uri: `https://ui-avatars.com/api/?name=${placeholderName}&size=300`,
          }}
        />
      )}
    </Pressable>
  );
}
