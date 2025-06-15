import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  StatusBar,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

type Artist = {
  id: string;
  name: string;
  imageUrl: ImageSourcePropType;
  studio: string;
  rating: string;
  experience: string;
  specialties: string[];
  coverImageUrl: ImageSourcePropType;
  tattooCount: number;
  followersCount: number;
};

type ArtistCardProps = {
  artist: Artist;
};

const ArtistCard: React.FC<ArtistCardProps & { navigation: any }> = ({ artist, navigation }) => {
  // Görüntünün doğru şekilde yüklenmesi için key ekleyerek önbelleği zorla yeniliyoruz
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ArtistProfile', { id: artist.id })}
    >
      <Image 
        source={artist.imageUrl} 
        style={styles.artistImage} 
        key={`artist-image-${artist.id}`} // Benzersiz key ekliyoruz
      />
      <View style={styles.cardContent}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.studioName}>{artist.studio}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.primary} />
          <Text style={styles.rating}>{artist.rating}</Text>
        </View>
        <View style={styles.specialtiesContainer}>
          {artist.specialties.map((specialty: string, index: number) => (
            <Text key={index} style={styles.specialty}>
              {specialty}
            </Text>
          ))}
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{artist.tattooCount} tattoos</Text>
          <Text style={styles.statsText}>{artist.followersCount} followers</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface ArtistsScreenProps {
  navigation: NavigationProp<any>;
}

export const ArtistsScreen: React.FC<ArtistsScreenProps> = ({ navigation }) => {
  // Görüntüleri doğrudan tanımlıyoruz ve önbellek sorunlarını önlemek için
  // her bir require ifadesini ayrı ayrı kullanıyoruz
  const artistImages = [
    require('../../assets/tattooartist1.jpg'),
    require('../../assets/tattooartist2.jpg'),
    require('../../assets/tattooartist3.jpg'),
    require('../../assets/tattooartist4.jpg'),
    require('../../assets/tattooartist5.jpg'),
    require('../../assets/tattooartist6.jpg'),
    require('../../assets/tattooartist7.jpg'),
    require('../../assets/tattooartist8.jpg'),
    require('../../assets/tattooartist9.jpg'),
    require('../../assets/tattooartist10.jpg')
  ];

  const artistNames = [
    'Alex Thompson',
    'Maria Rodriguez',
    'David Chen',
    'Sarah Kim',
    'James Wilson',
    'Emma Davis',
    'Michael Lee',
    'Sofia Garcia',
    'Daniel Park',
    'Isabella Martinez',
  ];

  const artistStudios = [
    'Ink Master Studio',
    'The Art of Tattoo',
    'Dragon Ink',
    'Modern Lines',
    'Black Rose Tattoo',
    'Sacred Art',
    'Electric Needle',
    'Golden Temple',
    'Phoenix Ink',
    'Dark Arts Studio',
  ];

  const artistRatings = ['4.9', '4.8', '4.7', '4.9', '4.8', '4.9', '4.7', '4.8', '4.9', '4.8'];

  const artistExperiences = [
    '8 years',
    '12 years',
    '6 years',
    '10 years',
    '15 years',
    '7 years',
    '9 years',
    '11 years',
    '13 years',
    '8 years',
  ];

  const artistSpecialties = [
    ['Traditional', 'Japanese'],
    ['Realism', 'Portrait'],
    ['Geometric', 'Minimalist'],
    ['Watercolor', 'Abstract'],
    ['Neo-Traditional', 'Color'],
    ['Black & Grey', 'Tribal'],
    ['New School', 'Custom'],
    ['Fine Line', 'Lettering'],
    ['Blackwork', 'Dotwork'],
    ['Oriental', 'Traditional'],
  ];

  // Kapak fotoğrafları için farklı bir dizi oluşturuyoruz
  // Burada basitçe artistImages dizisini farklı bir sırayla kullanıyoruz
  const artistCoverImages = [
    require('../../assets/tattooartist10.jpg'),
    require('../../assets/tattooartist9.jpg'),
    require('../../assets/tattooartist8.jpg'),
    require('../../assets/tattooartist7.jpg'),
    require('../../assets/tattooartist6.jpg'),
    require('../../assets/tattooartist5.jpg'),
    require('../../assets/tattooartist4.jpg'),
    require('../../assets/tattooartist3.jpg'),
    require('../../assets/tattooartist2.jpg'),
    require('../../assets/tattooartist1.jpg')
  ];

  const mockArtists: Artist[] = artistNames.map((name, index) => ({
    id: (index + 1).toString(),
    name,
    imageUrl: artistImages[index],
    studio: artistStudios[index],
    rating: artistRatings[index],
    experience: artistExperiences[index],
    specialties: artistSpecialties[index],
    coverImageUrl: artistCoverImages[index],
    tattooCount: Math.floor(Math.random() * 200) + 100,
    followersCount: Math.floor(Math.random() * 5000) + 1000,
  }));

  const [loading, setLoading] = useState(false);
  const [displayedArtists, setDisplayedArtists] = useState(mockArtists.slice(0, 6));

  const loadMoreArtists = () => {
    if (loading) return;

    setLoading(true);
    const currentLength = displayedArtists.length;
    const nextArtists = mockArtists.slice(currentLength, currentLength + 3);

    if (nextArtists.length > 0) {
      setTimeout(() => {
        setDisplayedArtists([...displayedArtists, ...nextArtists]);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMoreArtists();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {displayedArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} navigation={navigation} />
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollViewContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    width: CARD_WIDTH,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  artistImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: SPACING.md,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  studioName: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: COLORS.text,
  },
  specialtiesContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginBottom: 8,
  },
  specialty: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  statsText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
});
