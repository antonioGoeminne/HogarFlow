import { StyleSheet, Text, View } from 'react-native';

type AvatarProps = {
  name: string;
  color: string;
  size?: number;
};

/** Round, color-filled member avatar showing the first letter of the name. */
export function Avatar({ name, color, size = 44 }: AvatarProps) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}>
      <Text style={[styles.letter, { fontSize: size * 0.4 }]}>{name[0]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: '#fff',
    fontWeight: '800',
  },
});
