import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';
import { toggleFavorite } from '../store/tattoosSlice';
import { RootState } from '../store';

const { width } = Dimensions.get('window');

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  MainTabs: undefined;
  TattooDetail: { id: string };
  Appointment: { tattooId: string };
};

type TattooDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TattooDetail'>;

export const TattooDetailScreen: React.FC<TattooDetailScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const tattoo = useSelector((state: RootState) =>
    state.tattoos.allTattoos.find((t) => t.id === id),
  );

  if (!tattoo) {
    return (
      <View style={styles.container}>
        <Text>Tattoo not found</Text>
      </View>
    );
  }

  const handleLikePress = () => {
    dispatch(toggleFavorite(id));
  };

  const handleBookAppointment = () => {
    navigation.navigate('Appointment', { tattooId: id });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={tattoo.imageUrl} style={styles.image} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Ionicons
            name={tattoo.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={tattoo.isFavorite ? COLORS.primary : COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>Artist: {tattoo.artist}</Text>
          <Text style={styles.category}>Category: {tattoo.category}</Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>{tattoo.likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={20} color={COLORS.secondary} />
            <Text style={styles.statNumber}>2.5k</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="share-outline" size={20} color={COLORS.text} />
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Shares</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            This beautiful tattoo design represents artistic excellence and attention to detail. The
            artist specializes in this style and has created numerous similar pieces.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
    height: width,
  },
  header: {
    position: 'absolute',
    top: SPACING.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: SPACING.md,
  },
  artistInfo: {
    marginBottom: SPACING.md,
  },
  artistName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: SPACING.lg,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
  },
});
