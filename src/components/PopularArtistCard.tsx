import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface PopularArtistCardProps {
  name: string;
  image: string;
  likes: number;
  onPress: () => void;
}

export const PopularArtistCard: React.FC<PopularArtistCardProps> = ({
  name,
  image,
  likes,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.likesContainer}>
          <Ionicons name="heart-outline" size={16} color={COLORS.secondary} />
          <Text style={styles.likes}>{likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.md,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.round,
  },
  infoContainer: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  likes: {
    marginLeft: SPACING.xs,
    color: COLORS.secondary,
    fontSize: 14,
  },
});
