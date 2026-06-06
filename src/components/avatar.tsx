import { StyleSheet, Text, View } from 'react-native';

import { MEMBERS, type MemberId } from '@/constants/family';

type AvatarProps = {
  who: MemberId;
  size?: number;
};

/** Round, color-filled member avatar showing the first letter of the name. */
export function Avatar({ who, size = 44 }: AvatarProps) {
  const member = MEMBERS[who];
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: member.color },
      ]}>
      <Text style={[styles.letter, { fontSize: size * 0.4 }]}>{member.name[0]}</Text>
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
