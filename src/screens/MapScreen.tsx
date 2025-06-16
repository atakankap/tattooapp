import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  Platform,
  Alert,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
// Mobilde react-native-maps, webde react-leaflet kullanılacak
let MapView: any, Marker: any, Region: any;
if (Platform.OS === 'web') {
  // @ts-ignore
  MapView = require('react-leaflet').MapContainer;
  // @ts-ignore
  Marker = require('react-leaflet').Marker;
  // @ts-ignore
  require('leaflet/dist/leaflet.css');
} else {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
  Region = require('react-native-maps').Region;
}
import { StudioMarker } from '../components/StudioMarker';

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

import { useRoute } from '@react-navigation/native';

export const MapScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const route = useRoute();
  const [region, setRegion] = useState<any>({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Center map if coordinates are passed in navigation params
  React.useEffect(() => {
    // @ts-ignore
    const coordinates = route.params?.coordinates;
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      setRegion((prev: any) => ({
        ...prev,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }));
    }
  }, [route.params]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudios = mockStudios.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.description?.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'rating') return matchesSearch && studio.rating >= 4.5;
    if (selectedFilter === 'distance') return matchesSearch && parseFloat(studio.distance) <= 1.0;
    return matchesSearch;
  });

  const handleStudioPress = (id: string) => {
    const studio = mockStudios.find((s) => s.id === id);
    setSelectedStudio(studio || null);
    bottomSheetRef.current?.snapToIndex(0);
  };

  if (Platform.OS === 'web') {
    const { MapContainer, TileLayer, Marker: LeafletMarker, Popup } = require('react-leaflet');
    require('leaflet/dist/leaflet.css');
    return (
      <div style={{ flex: 1, background: COLORS.background, height: '100vh' }}>
        <div style={{ padding: 16 }}>
          <input
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '60%' }}
            placeholder="Search studios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <MapContainer
          center={[region.latitude, region.longitude]}
          zoom={13}
          style={{ width: '100%', height: '40vh', marginBottom: 24 }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredStudios.map((studio) => (
            <LeafletMarker
              key={studio.id}
              position={[studio.coordinate.latitude, studio.coordinate.longitude]}
            >
              <Popup>
                <b>{studio.title}</b>
                <br />
                {studio.description}
              </Popup>
            </LeafletMarker>
          ))}
        </MapContainer>
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search studios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.secondary}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Ionicons name="filter" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterOption, selectedFilter === 'all' && styles.filterOptionSelected]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text
              style={[styles.filterText, selectedFilter === 'all' && styles.filterTextSelected]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'rating' && styles.filterOptionSelected,
            ]}
            onPress={() => setSelectedFilter('rating')}
          >
            <Text
              style={[styles.filterText, selectedFilter === 'rating' && styles.filterTextSelected]}
            >
              Top Rated
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'distance' && styles.filterOptionSelected,
            ]}
            onPress={() => setSelectedFilter('distance')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'distance' && styles.filterTextSelected,
              ]}
            >
              Nearby
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={styles.studioList}>
        {filteredStudios.map((studio) => (
          <TouchableOpacity
            key={studio.id}
            style={styles.studioCard}
            onPress={() => {
              setSelectedStudio(studio);
              bottomSheetRef.current?.snapToIndex(0);
            }}
          >
            <Image source={{ uri: studio.imageUrl }} style={styles.studioCardImage} />
            <View style={styles.studioCardContent}>
              <Text style={styles.studioCardTitle}>{studio.title}</Text>
              <View style={styles.studioCardDetails}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={COLORS.primary} />
                  <Text style={styles.ratingText}>{studio.rating}</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <Ionicons name="location" size={16} color={COLORS.primary} />
                  <Text style={styles.distanceText}>{studio.distance}</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        {selectedStudio ? (
          <View style={styles.contentContainer}>
            <Image source={{ uri: selectedStudio.imageUrl }} style={styles.studioImage} />
            <Text style={styles.studioTitleLarge}>{selectedStudio.title}</Text>
            <Text style={styles.studioRating}>Rating: {selectedStudio.rating}/5</Text>
            <Text style={styles.studioDescription}>{selectedStudio.description}</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{selectedStudio.workingHours}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{selectedStudio.address}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.emptyText}>Select a studio to see details</Text>
          </View>
        )}
      </BottomSheet>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        {mockStudios.map((studio) => (
          <StudioMarker
            key={studio.id}
            id={studio.id}
            coordinate={studio.coordinate}
            title={studio.title}
            rating={studio.rating}
            onPress={(id) => {
              const studio = mockStudios.find((s) => s.id === id);
              setSelectedStudio(studio || null);
              bottomSheetRef.current?.snapToIndex(0);
            }}
          />
        ))}
      </MapView>
    </View>
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
  studioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    padding: SPACING.sm,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studioCardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  studioCardContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  studioCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  studioCardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  ratingText: {
    marginLeft: SPACING.xs,
    color: COLORS.text,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    marginLeft: SPACING.xs,
    color: COLORS.text,
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  studioImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  studioTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  studioRating: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: SPACING.sm,
  },
  studioDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  infoContainer: {
    marginBottom: SPACING.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    width: width,
    height: height * 0.4,
  },
  studioList: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },

  studioInfo: {
    flex: 1,
  },
  studioTitleSmall: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  studioDetails: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
});
