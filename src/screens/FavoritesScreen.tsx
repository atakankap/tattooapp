import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { COLORS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const FavoritesScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          left: 10,
          zIndex: 10,
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 4,
          elevation: 2,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={{ height: 56 }} />
      {/* Favorites content below */}
      <FavoritesList navigation={navigation} />
    </View>
  );
};

// Converted the entire existing code to FavoritesList function:
const FavoritesList = ({ navigation }: any) => {
  const { filteredTattoos } = useSelector((state: RootState) => state.tattoos);
  const favorites = filteredTattoos.filter((t) => t.isFavorite);

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={48} color={COLORS.secondary} />
        <Text style={styles.emptyText}>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: SPACING.md }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TattooDetail', { id: item.id })}
        >
          <Image source={item.imageUrl} style={styles.image} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Ionicons name="heart" size={16} color={COLORS.primary} />
              <Text style={styles.likes}>{item.likes}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={22} color={COLORS.secondary} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },
  artist: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  likes: {
    marginLeft: 6,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: COLORS.secondary,
    fontSize: 16,
    marginTop: 12,
  },
});
