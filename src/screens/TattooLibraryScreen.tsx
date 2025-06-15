import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageSourcePropType, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, updateSearchQuery } from '../store/tattoosSlice';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { TattooGrid } from '../components/TattooGrid';
import { RootState } from '../store';

// Tattoo type definition
interface Tattoo {
  id: string;
  imageUrl: ImageSourcePropType;
  title: string;
  style: string;
  category: string;
  likes: number;
  isFavorite: boolean;
  artist: string;
  bodyPart: string;
  views?: number;
  createdAt?: string;
}

interface TattooLibraryScreenProps {
  navigation: any;
}

// Kategori filtreleri eklendi
const categories = [
  { id: 'all', name: 'All' },
  { id: 'geometric', name: 'Geometric' },
  { id: 'animals', name: 'Animals' },
  { id: 'floral', name: 'Floral' },
  { id: 'lettering', name: 'Lettering' }
];

const stylesList = [
  { id: 'color', name: 'Color' },
  { id: 'blackandgrey', name: 'Black & Grey' },
  { id: 'linework', name: 'Line Work' },
  { id: 'dotwork', name: 'Dot Work' },
];

const bodyParts = [
  { id: 'arm', name: 'Arm' },
  { id: 'leg', name: 'Leg' },
  { id: 'back', name: 'Back' },
  { id: 'chest', name: 'Chest' },
  { id: 'shoulder', name: 'Shoulder' },
  { id: 'hand', name: 'Hand' },
];

export const TattooLibraryScreen: React.FC<TattooLibraryScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  // Using allTattoos from Redux instead of filteredTattoos
  const { allTattoos } = useSelector((state: RootState) => state.tattoos);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(updateSearchQuery(query));
  };

  const handleFilter = () => {
    Alert.alert('Filter', 'Filter options coming soon!');
  };

  const handleSort = () => {
    Alert.alert('Sort', 'Sort options coming soon!');
  };

  const handleLayout = () => {
    Alert.alert('Layout', 'Layout options coming soon!');
  };

  const handleTattooPress = (id: string) => {
    navigation.navigate('TattooDetail', { id });
  };

  const handleLikePress = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const finalFilteredTattoos = useMemo(() => {
    // Kaslı vücutlu dövmeleri (büyük dövmeleri) listenin altına taşıma
    const sortedTattoos = [...allTattoos].sort((a, b) => {
      // Büyük dövmeleri (chest, back gibi body part'ları) aşağı taşı
      if (a.bodyPart === 'Chest' || a.bodyPart === 'Back') return 1;
      if (b.bodyPart === 'Chest' || b.bodyPart === 'Back') return -1;
      return 0;
    });
    
    return sortedTattoos.filter((tattoo) => {
      // Kategori filtresi
      if (selectedCategory !== 'all' && tattoo.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Style filter
      if (selectedStyle && tattoo.style !== selectedStyle) {
        return false;
      }

      // Body part filter
      if (selectedBodyPart && tattoo.bodyPart !== selectedBodyPart) {
        return false;
      }

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          tattoo.title.toLowerCase().includes(query) ||
          tattoo.artist.toLowerCase().includes(query) ||
          tattoo.category.toLowerCase().includes(query) ||
          tattoo.style.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [allTattoos, selectedCategory, selectedStyle, selectedBodyPart, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search tattoos..."
          style={styles.searchBar}
        />
        
        {/* Kategori filtreleri eklendi */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.selectedCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.selectedCategoryChipText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.filterHeader}>
          <Text style={styles.resultsText}>{finalFilteredTattoos.length} results</Text>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="options-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filterTitle}>Style</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {stylesList.map((style) => (
                <TouchableOpacity
                  key={style.id}
                  style={[styles.filterChip, selectedStyle === style.id && styles.selectedFilterChip]}
                  onPress={() => setSelectedStyle(selectedStyle === style.id ? null : style.id)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedStyle === style.id && styles.selectedFilterChipText,
                    ]}
                  >
                    {style.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.filterTitle}>Body Part</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {bodyParts.map((part) => (
                <TouchableOpacity
                  key={part.id}
                  style={[
                    styles.filterChip,
                    selectedBodyPart === part.id && styles.selectedFilterChip,
                  ]}
                  onPress={() => setSelectedBodyPart(selectedBodyPart === part.id ? null : part.id)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedBodyPart === part.id && styles.selectedFilterChipText,
                    ]}
                  >
                    {part.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TattooGrid
          tattoos={finalFilteredTattoos.map(tattoo => ({
            id: tattoo.id,
            imageUrl: tattoo.imageUrl as any, 
            likes: tattoo.likes,
            isFavorite: tattoo.isFavorite,
          }))}
          onTattooPress={handleTattooPress}
          onLikePress={handleLikePress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchBar: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  categoryScroll: {
    marginBottom: SPACING.md,
  },
  categoryScrollContent: {
    paddingHorizontal: SPACING.md,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginRight: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategoryChip: {
    backgroundColor: COLORS.primary,
  },
  categoryChipText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryChipText: {
    color: COLORS.white,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  resultsText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  filterButton: {
    padding: SPACING.sm,
  },
  filtersContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  filterScroll: {
    marginBottom: SPACING.md,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    marginRight: SPACING.sm,
  },
  selectedFilterChip: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    color: COLORS.text,
    fontSize: 14,
  },
  selectedFilterChipText: {
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
