import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface TattooCardProps {
  imageUrl: ImageSourcePropType;
  title: string;
  style: string;
  likes: number;
  isFavorite: boolean;
  onPress: () => void;
  onLikePress: () => void;
}

export const TattooCard: React.FC<TattooCardProps> = ({
  imageUrl,
  title,
  style,
  likes,
  isFavorite,
  onPress,
  onLikePress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={imageUrl} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <TouchableOpacity onPress={onLikePress} style={styles.heartButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? COLORS.primary : COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.style}>{style}</Text>
        </View>
        <View style={styles.likesContainer}>
          <Ionicons name="heart" size={16} color={COLORS.primary} />
          <Text style={styles.likeCount}>{likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  info: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs / 2,
  },
  style: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
    minHeight: 220,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 180,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: SPACING.sm,
  },
  heartButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    minHeight: 64,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  likeCount: {
    marginLeft: SPACING.xs,
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
});
