import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

const { width } = Dimensions.get('window');
const GALLERY_IMAGE_SIZE = width / 3 - SPACING.sm * 2;

interface ArtistProfileScreenProps {
  route: {
    params: {
      id: string;
    };
  };
  navigation: any;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  userImage: any;
}

interface GalleryItem {
  id: string;
  imageUrl: any;
  likes: number;
}

interface Artist {
  id: string;
  name: string;
  studio: string;
  rating: number;
  experience: string;
  specialties: string[];
  imageUrl: any;
  coverImageUrl: any;
  tattooCount: number;
  followersCount: number;
  bio: string;
  location: string;
  phone: string;
  workingHours: string;
  priceRange: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  gallery: GalleryItem[];
  reviews: Review[];
}

export const ArtistProfileScreen = ({ route, navigation }: ArtistProfileScreenProps): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'info' | 'reviews'>('gallery');
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load artist data
  useEffect(() => {
    // Get artist ID from route params
    const artistId = route.params?.id;
    console.log('Artist ID from route params:', artistId);
    
    if (!artistId) {
      console.error('No artist ID provided in route params');
      setLoading(false);
      return;
    }
    
    // Here we would normally make an API call
    // For now, we're finding the artist from our mock data
    const mockArtists = getMockArtists();
    console.log('Available artists:', mockArtists.map(a => ({ id: a.id, name: a.name })));
    
    const selectedArtist = mockArtists.find(a => a.id === artistId);
    console.log('Selected artist:', selectedArtist ? selectedArtist.name : 'Not found');
    
    if (selectedArtist) {
      setArtist(selectedArtist);
    } else {
      // If artist not found, show the first artist as default
      console.warn(`Artist with ID ${artistId} not found, showing default artist`);
      setArtist(mockArtists[0]);
    }
    
    setLoading(false);
  }, [route.params?.id]);

  // Different images for artist profile photos
  const artistProfiles = [
    require('../../assets/tattoos/indir (3).jpg'),
    require('../../assets/tattoos/indir (4).jpg'),
    require('../../assets/tattoos/indir (5).jpg'),
    require('../../assets/tattoos/indir (6).jpg'),
    require('../../assets/tattoos/indir.jpg'),
  ];
  
  // Function to generate mock artist data
  const getMockArtists = (): Artist[] => [
    {
      id: '1',
      name: 'Alex Thompson',
      studio: 'Ink Master Studio',
      rating: 4.9,
      experience: '8 yrs',
      specialties: ['Traditional', 'Japanese'],
      imageUrl: artistProfiles[0],
      coverImageUrl: require('../../assets/tattoos/indir (19).jpg'),
      tattooCount: 245,
      followersCount: 15600,
      bio: 'Professional tattoo artist with 8 years of experience. Specialized in traditional and Japanese tattoos.',
      location: 'New York, USA',
      phone: '+1 555 123 4567',
      workingHours: 'Tue-Sat: 10:00 AM - 7:00 PM',
      priceRange: '$150-500/hour',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
      gallery: [
        {
          id: '1',
          imageUrl: require('../../assets/tattoos/indir (10).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
        {
          id: '2',
          imageUrl: require('../../assets/tattoos/indir (11).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
        {
          id: '3',
          imageUrl: require('../../assets/tattoos/indir (12).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
        {
          id: '4',
          imageUrl: require('../../assets/tattoos/indir (13).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
      ],
      reviews: [
        {
          id: '1',
          user: 'Michael Brown',
          rating: 4,
          date: '3 weeks ago',
          comment: 'Clean lines and great attention to detail. Very happy with the result.',
          userImage: artistProfiles[2],
        },
      ],
    },
    {
      id: '2',
      name: 'David Chen',
      studio: 'Geometric Ink',
      rating: 4.7,
      experience: '6 yrs',
      specialties: ['Neo-Traditional', 'Geometric', 'Dotwork'],
      imageUrl: artistProfiles[2],
      coverImageUrl: require('../../assets/tattoos/indir (18).jpg'),
      tattooCount: 178,
      followersCount: 9400,
      bio: 'Specializing in geometric and minimalist designs with clean lines and precise execution.',
      location: 'Chicago, USA',
      phone: '+1 555 456 7890',
      workingHours: 'Wed-Sun: 12:00 PM - 9:00 PM',
      priceRange: '$120-350/hour',
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298,
      },
      gallery: [
        {
          id: '1',
          imageUrl: require('../../assets/tattoos/indir (15).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
        {
          id: '2',
          imageUrl: require('../../assets/tattoos/indir (16).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
        {
          id: '3',
          imageUrl: require('../../assets/tattoos/indir (17).jpg'),
          likes: Math.floor(Math.random() * 1000),
        },
      ],
      reviews: [
        {
          id: '1',
          user: 'Alex Wong',
          rating: 4,
          date: '1 month ago',
          comment: 'Great geometric work, very precise and clean lines.',
          userImage: artistProfiles[4],
        },
      ],
    },
  ];

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <TouchableOpacity style={styles.galleryItem}>
      <Image source={item.imageUrl} style={styles.galleryImage} />
      <View style={styles.galleryItemOverlay}>
        <Ionicons name="heart" size={14} color={COLORS.white} />
        <Text style={styles.likeCount}>{item.likes}</Text>
      </View>
    </TouchableOpacity>
  );

  // Review item renderer
  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <Image source={item.userImage} style={styles.reviewerImage} />
      <View style={styles.reviewContent}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>{item.user}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name="star"
              size={14}
              color={i < item.rating ? COLORS.primary : COLORS.lightGray}
            />
          ))}
        </View>
        <Text style={styles.reviewText}>{item.comment}</Text>
      </View>
    </View>
  );

  if (loading || !artist) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Message Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={messageModalVisible}
        onRequestClose={() => setMessageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Message to {artist.name}</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Write your message here..."
              multiline
              value={messageText}
              onChangeText={setMessageText}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setMessageModalVisible(false)} />
              <Button
                title="Send"
                onPress={() => {
                  Alert.alert('Message Sent', `Your message has been sent to ${artist.name}`);
                  setMessageModalVisible(false);
                  setMessageText('');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Cover Image and Back Button */}

      <ScrollView>
        <Image source={{ uri: artist.coverImageUrl }} style={styles.coverImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View
          style={{ position: 'absolute', top: SPACING.lg, right: SPACING.md, flexDirection: 'row' }}
        >
          <TouchableOpacity
            style={[styles.messageButton, { marginRight: 8 }]}
            onPress={() => setMessageModalVisible(true)}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.messageButton, { backgroundColor: COLORS.secondary }]}
            onPress={() => navigation.navigate('Appointment', { tattooId: artist.id })}
          >
            <Ionicons name="calendar-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileHeader}>
          <Image source={{ uri: artist.imageUrl }} style={styles.profileImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.artistName}>{artist.name}</Text>
            <Text style={styles.studioName}>{artist.studio}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={COLORS.primary} />
              <Text style={styles.rating}>{artist.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{artist.tattooCount}</Text>
            <Text style={styles.statLabel}>Designs</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{artist.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{artist.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'gallery' && styles.activeTab]}
            onPress={() => setActiveTab('gallery')}
          >
            <Text style={[styles.tabText, activeTab === 'gallery' && styles.activeTabText]}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'gallery' && (
          <FlatList
            data={artist.gallery}
            renderItem={renderGalleryItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.galleryContainer}
          />
        )}

        {activeTab === 'info' && (
          <View style={styles.infoContainer}>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Biography</Text>
              <Text style={styles.infoText}>{artist.bio}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Experience</Text>
              <Text style={styles.infoText}>{artist.experience}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Specialties</Text>
              <View style={styles.specialtiesContainer}>
                {artist.specialties.map((spec: string, i: number) => (
                  <View key={i} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{spec}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Contact</Text>
              <Text style={styles.infoText}>Phone: {artist.phone}</Text>
              <Text style={styles.infoText}>Address: {artist.location}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Location on Map</Text>
              <View
                style={{
                  width: '100%',
                  height: 180,
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginTop: 8,
                }}
              >
                {/* MapView native için, web ise bir placeholder */}
                {typeof window === 'undefined' ? (
                  <></>
                ) : (
                  <Text style={{ color: '#888' }}>Map is available on mobile.</Text>
                )}
                {/* React Native MapView ile mobilde aşağıdaki kodu kullanabilirsiniz:
                <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: artist.coordinates.latitude,
                    longitude: artist.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <Marker coordinate={artist.coordinates} />
                </MapView>
                */}
              </View>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Price Range</Text>
              <Text style={styles.infoText}>{artist.priceRange}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Working Hours</Text>
              <Text style={styles.infoText}>{artist.workingHours}</Text>
            </View>
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            <FlatList
              data={artist.reviews}
              renderItem={renderReviewItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: SPACING.md,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.white,
    marginTop: -40,
  },
  headerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  artistName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  studioName: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    color: COLORS.text,
    fontSize: 14,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  galleryContainer: {
    padding: SPACING.sm,
  },
  galleryItem: {
    width: GALLERY_IMAGE_SIZE,
    height: GALLERY_IMAGE_SIZE,
    margin: SPACING.sm,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  galleryItemOverlay: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  infoContainer: {
    padding: SPACING.md,
  },
  infoSection: {
    marginBottom: SPACING.md,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  reviewsContainer: {
    padding: SPACING.md,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: SPACING.sm,
  },
  bookButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    alignItems: 'center',
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
