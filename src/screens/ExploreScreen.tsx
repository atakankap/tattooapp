import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { SearchBar } from '../components/SearchBar';
// CategoryList import removed
import { TattooCard } from '../components/TattooCard';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteAndPersist } from '../store/tattoosSlice';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';

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
}

// Style options
const styleOptions = [
  'All Styles',
  'Traditional',
  'Neo-Traditional',
  'Realism',
  'Watercolor',
  'Japanese',
  'Tribal',
  'Blackwork',
  'Geometric',
  'Minimalist',
  'Dotwork',
  'Linework',
  'Old School',
  'Mixed'
];

// Category options removed as requested
// const categoryOptions = [];

export const ExploreScreen = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.tattoos.error);

  // API call disabled, only using local mock data
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  // Category selection removed
  const allTattoos = useSelector((state: RootState) => state.tattoos.allTattoos);
  const navigation = useNavigation();
  
  // Debug: Log tattoo counts on mount
  useEffect(() => {
    console.log('Total tattoos:', allTattoos.length);
    const categories: Record<string, number> = {};
    allTattoos.forEach(tattoo => {
      categories[tattoo.category] = (categories[tattoo.category] || 0) + 1;
    });
    console.log('Categories in data:', categories);
  }, [allTattoos]);

  // Category selection handler removed

  // Handle style selection with toggle
  const handleStyleSelect = (style: string) => {
    // Debug: Log selected style and matching tattoos
    console.log('Selected style:', style);
    const matches = allTattoos.filter(t => t.style === style);
    console.log(`Found ${matches.length} tattoos with style '${style}'`);
    
    if (selectedStyle === style) {
      // If same style is selected, toggle back to "All Styles"
      setSelectedStyle('All Styles');
    } else {
      setSelectedStyle(style);
    }
  };

  // Debug: Log current filter settings
  React.useEffect(() => {
    console.log('Current filters:', {
      style: selectedStyle,
      search: searchQuery
    });
  }, [selectedStyle, searchQuery]);
  
  // Filter tattoos based on selected criteria - category filtering removed
  const filteredTattoos = allTattoos.filter((tattoo) => {
    // Style filtering - match style name or include in title (case insensitive)
    let styleMatch: boolean = selectedStyle === 'All Styles';
    if (!styleMatch && tattoo.style) {
      // Check for exact style match
      if (tattoo.style.toLowerCase() === selectedStyle.toLowerCase()) {
        styleMatch = true;
      }
      // Check for style in title
      else if (tattoo.title && tattoo.title.toLowerCase().includes(selectedStyle.toLowerCase())) {
        styleMatch = true;
      }
    }
    
    // Search query filtering - match any field
    let searchMatch: boolean = searchQuery === '';
    if (!searchMatch) {
      const query = searchQuery.toLowerCase();
      searchMatch = Boolean(
        (tattoo.title && tattoo.title.toLowerCase().includes(query)) ||
        (tattoo.artist && tattoo.artist.toLowerCase().includes(query)) ||
        (tattoo.category && tattoo.category.toLowerCase().includes(query)) ||
        (tattoo.style && tattoo.style.toLowerCase().includes(query))
      );
    }
    
    // All conditions must be met
    return styleMatch && searchMatch;
  });
  
  // Debug: Log filtered results
  useEffect(() => {
    console.log(`Filtered tattoos: ${filteredTattoos.length}`);
    if (selectedStyle !== 'All Styles') {
      console.log(`Style filter: ${selectedStyle}`);
    }
    if (searchQuery) {
      console.log(`Search query: ${searchQuery}`);
    }
  }, [filteredTattoos, selectedStyle, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {error && (
          <View style={{ backgroundColor: '#fdd', padding: 8, borderRadius: 8, margin: 8 }}>
            <Text style={{ color: '#900', fontWeight: 'bold' }}>Error: {error}</Text>
          </View>
        )}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tattoo designs..."
          style={styles.searchBar}
        />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tattooGrid}>
          {allTattoos.length === 0 ? (
            <Text style={styles.noDataText}>No tattoos available</Text>
          ) : filteredTattoos.length === 0 ? (
            <Text style={styles.noDataText}>No tattoos found for selected filters</Text>
          ) : (
            filteredTattoos.map((tattoo) => (
              <View key={tattoo.id} style={styles.tattooItem}>
                <TattooCard
                  imageUrl={tattoo.imageUrl}
                  title={tattoo.title}
                  style={tattoo.style}
                  likes={tattoo.likes}
                  isFavorite={tattoo.isFavorite}
                  onPress={() => (navigation as any).navigate('TattooDetail', { id: tattoo.id })}
                  onLikePress={() => dispatch(toggleFavoriteAndPersist(tattoo.id) as any)}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 0, // SafeAreaView is used, so no need for padding
  },
  searchBar: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 0, // SafeAreaView is used, so no need for padding
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  tattooGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  tattooItem: {
    width: '50%',
    padding: SPACING.xs,
    minHeight: 200,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
});
