import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Image } from 'react-native';
import { useEffect } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { StudioMarker } from '../components/StudioMarker';
import { DebugPanel } from '../components/DebugPanel';

interface Studio {
  imageUrl?: string;
  description?: string;
  workingHours?: string;
  address?: string;
  id: string;
  title: string;
  rating: number;
  distance: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const mockStudios: Studio[] = [
  {
    id: '1',
    title: 'Ink Master Studio',
    rating: 4.8,
    distance: '0.5 km',
    coordinate: {
      latitude: 52.2297,
      longitude: 21.0122,
    },
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=500',
    description:
      'One of the best tattoo studios in the city. Specializing in traditional and modern styles.',
    workingHours: 'Mon-Sat: 10:00-20:00',
    address: '123 Main St, City Center',
  },
  {
    id: '2',
    title: 'Art & Soul Tattoo',
    rating: 4.5,
    distance: '1.2 km',
    coordinate: {
      latitude: 52.2315,
      longitude: 21.0201,
    },
    imageUrl: 'https://images.unsplash.com/photo-1598371839873-8ceedd6971e5?w=500',
    description: 'Custom tattoo designs and professional artists with years of experience.',
    workingHours: 'Tue-Sun: 11:00-21:00',
    address: '456 Art Street, Downtown',
  },
  {
    id: '3',
    title: 'Black Rose Tattoo',
    rating: 4.7,
    distance: '0.8 km',
    coordinate: {
      latitude: 52.233,
      longitude: 21.018,
    },
    imageUrl: 'https://images.unsplash.com/photo-1590246814883-57767d078e96?w=500',
    description:
      'Specialized in black and grey realism tattoos. Professional and sterile environment.',
    workingHours: 'Mon-Sun: 12:00-22:00',
    address: '789 Ink Street, East Side',
  },
  {
    id: '4',
    title: 'Electric Needle',
    rating: 4.6,
    distance: '1.5 km',
    coordinate: {
      latitude: 52.228,
      longitude: 21.015,
    },
    imageUrl: 'https://images.unsplash.com/photo-1612875895771-76bba1a61a92?w=500',
    description:
      'Modern studio with experienced artists specializing in colorful and neo-traditional tattoos.',
    workingHours: 'Wed-Sun: 11:00-21:00',
    address: '321 Tattoo Ave, West End',
  },
];

export const MapScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudios = mockStudios.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.description?.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'rating') return matchesSearch && studio.rating >= 4.5;
    if (selectedFilter === 'distance') {
      // '0.5 km' gibi stringleri güvenli şekilde parse et
      const numDistance = Number((studio.distance || '').replace(/[^\d.]/g, ''));
      return matchesSearch && numDistance <= 1.0;
    }
    return matchesSearch;
  });

  // Animated border array (map dışında, hook sırası bozulmaz)
  const borderAnims = useRef(filteredStudios.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    filteredStudios.forEach((studio, idx) => {
      Animated.timing(borderAnims[idx], {
        toValue: selectedStudio?.id === studio.id ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudio, filteredStudios.length]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 6,
              borderRadius: 18,
            },
          ]}
        >
          <Ionicons name="search" size={20} color={COLORS.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search studios..."
            placeholderTextColor={COLORS.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <View style={styles.filterContainer}>
        {[ 'all', 'rating', 'distance' ].map((filter) => {
          let iconName = '';
          let iconFilled = false;
          if (filter === 'all') {
            iconName = selectedFilter === 'all' ? 'apps' : 'apps-outline';
            iconFilled = selectedFilter === 'all';
          } else if (filter === 'rating') {
            iconName = selectedFilter === 'rating' ? 'star' : 'star-outline';
            iconFilled = selectedFilter === 'rating';
          } else if (filter === 'distance') {
            iconName = selectedFilter === 'distance' ? 'location' : 'location-outline';
            iconFilled = selectedFilter === 'distance';
          }
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterOption,
                selectedFilter === filter && styles.filterOptionSelected,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Ionicons
                name={iconName as any}
                size={18}
                color={selectedFilter === filter ? COLORS.white : COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextSelected,
                ]}
              >
                {filter === 'all' && 'All'}
                {filter === 'rating' && 'Top Rated'}
                {filter === 'distance' && 'Nearby'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Harita kutusu */}
      <View style={styles.mapCard}>
        <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
          {filteredStudios.map((studio) => (
            <Marker
              key={studio.id}
              coordinate={studio.coordinate}
              onPress={() => setSelectedStudio(studio)}
            >
              <StudioMarker
  coordinate={studio.coordinate}
  title={studio.title}
  rating={studio.rating}
  onPress={() => setSelectedStudio(studio)}
  selected={selectedStudio?.id === studio.id}
/>
            </Marker>
          ))}
        </MapView>
      </View>
      {/* Alt bilgi kutuları */}
      <ScrollView
        style={styles.studioCardsContainer}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredStudios.map((studio, idx) => {
          const isSelected = selectedStudio?.id === studio.id;
          const borderColor = borderAnims[idx].interpolate({
            inputRange: [0, 1],
            outputRange: ['#e0e0e0', '#33CC66'],
          });
          return (
            <TouchableOpacity
              key={studio.id}
              activeOpacity={0.9}
              onPress={() => setSelectedStudio(studio)}
              style={{ marginBottom: 14 }}
            >
              <Animated.View
                style={[
                  styles.studioCard,
                  {
                    borderColor,
                    borderWidth: 2,
                    shadowColor: isSelected ? '#33CC66' : COLORS.primary,
                    shadowOpacity: isSelected ? 0.18 : 0.08,
                    elevation: isSelected ? 6 : 2,
                  },
                ]}
              >
                <LinearGradient
                  colors={isSelected ? ['#e9ffe9', '#c3f7fa'] : ['#fff', '#f7fafc']}
                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 0 }}
                >
                  <Image
                    source={{ uri: studio.imageUrl }}
                    style={{ width: 60, height: 60, borderRadius: 12, marginRight: 12 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.studioTitle}>{studio.title}</Text>
                    <Text style={styles.studioAddress}>{studio.address}</Text>
                    <Text style={{ color: COLORS.secondary, fontSize: 12 }}>
                      {studio.workingHours}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                      <Ionicons name="star" size={14} color={COLORS.primary} />
                      <Text style={{ color: COLORS.primary, fontWeight: 'bold', marginLeft: 3, marginRight: 10 }}>
                        {studio.rating.toFixed(1)}
                      </Text>
                      <Ionicons name="walk" size={14} color={COLORS.secondary} />
                      <Text style={{ color: COLORS.secondary, marginLeft: 3 }}>{studio.distance}</Text>
                    </View>
                  </View>
                  <View style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} />
                  </View>
                </LinearGradient>
              </Animated.View>
              <TouchableOpacity
                style={styles.routeButton}
                onPress={() => {
                  const url = Platform.select({
                    ios: `maps:0,0?q=${encodeURIComponent(studio.title)}@${studio.coordinate.latitude},${studio.coordinate.longitude}`,
                    android: `geo:0,0?q=${studio.coordinate.latitude},${studio.coordinate.longitude}(${encodeURIComponent(studio.title)})`,
                    default: `https://www.google.com/maps/search/?api=1&query=${studio.coordinate.latitude},${studio.coordinate.longitude}`,
                  });
                  if (url) {
                    Linking.openURL(url);
                  }
                }}
              >
                <Ionicons name="navigate" size={16} color={COLORS.primary} />
                <Text style={styles.routeButtonText}>Get Directions</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* Studio info modal */}
      <Modal
        visible={!!selectedStudio}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedStudio(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 18,
              padding: 24,
              width: '85%',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
              {selectedStudio?.title}
            </Text>
            <Text style={{ color: COLORS.secondary, marginBottom: 8 }}>
              {selectedStudio?.address}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="star" size={16} color={COLORS.primary} />
              <Text style={{ marginLeft: 3, fontWeight: 'bold', color: COLORS.primary }}>
                {selectedStudio?.rating.toFixed(1)}
              </Text>
              <Ionicons name="walk" size={16} color={COLORS.secondary} style={{ marginLeft: 12 }} />
              <Text style={{ marginLeft: 3, color: COLORS.secondary }}>
                {selectedStudio?.distance}
              </Text>
            </View>
            <Text style={{ marginBottom: 8 }}>{selectedStudio?.description}</Text>
            <Text style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>Working Hours: </Text>
              {selectedStudio?.workingHours}
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 12,
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 20,
              }}
              onPress={() => setSelectedStudio(null)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Debug Panel - sadece geliştirme/test için */}
      <DebugPanel />
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  mapCard: {
    margin: SPACING.md,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    backgroundColor: COLORS.white,
  },
  map: {
    width: '100%',
    height: height * 0.32,
  },
  studioCardsContainer: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  studioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  studioCardSelected: {
    borderColor: '#33CC66',
    backgroundColor: '#e9ffe9',
    elevation: 4,
    shadowOpacity: 0.13,
  },
  studioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  studioAddress: {
    fontSize: 13,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  routeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  routeButtonText: {
    marginLeft: 4,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoButton: {
    marginLeft: 14,
    backgroundColor: COLORS.background,
    borderRadius: 22,
    padding: 8,
    elevation: 1,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.sm,
    marginLeft: SPACING.xs,
    color: COLORS.text,
  },
  filterButton: {
    padding: SPACING.xs,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterOption: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  filterOptionSelected: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text,
    fontSize: 14,
  },
  filterTextSelected: {
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    width: '100%',
    height: height * 0.32, // Yüksekliği biraz düşürerek taşmayı önle
    borderRadius: 18,
    overflow: 'hidden',
  },
});
