import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { TattooCard } from './TattooCard';
import { SPACING, COLORS } from '../constants/theme';

interface TattooGridProps {
  tattoos: Array<{
    id: string;
    imageUrl: any; // ImageSourcePropType için any kullanıyoruz
    likes: number;
    isFavorite: boolean;
    title?: string;
    style?: string;
  }>;
  onTattooPress: (id: string) => void;
  onLikePress: (id: string) => void;
}

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / numColumns - SPACING.md * 2.5;

export const TattooGrid: React.FC<TattooGridProps> = ({ tattoos, onTattooPress, onLikePress }) => {
  const renderItem = ({ item }: { item: (typeof tattoos)[0] }) => (
    <View style={styles.tileContainer}>
      <TattooCard
        imageUrl={item.imageUrl}
        title={item.title || ''}
        style={item.style || ''}
        likes={item.likes}
        isFavorite={item.isFavorite}
        onPress={() => onTattooPress(item.id)}
        onLikePress={() => onLikePress(item.id)}
      />
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );

  return (
    <FlatList
      data={tattoos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={6}
      maxToRenderPerBatch={8}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg * 2,
  },
  tileContainer: {
    width: tileSize,
    margin: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
