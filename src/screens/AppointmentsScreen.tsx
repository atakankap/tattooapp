import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

// lightGray tanımı constants/theme.ts'de yoksa burada tanımlıyoruz
if (!COLORS.lightGray) {
  COLORS.lightGray = '#F0F0F0';
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.md * 2;

// Zenginleştirilmiş randevu verileri
const mockAppointments = [
  {
    id: '1',
    studio: 'Ink Master Studio',
    date: '2025-06-15',
    time: '14:00',
    status: 'upcoming',
    address: '123 Main St, City Center',
    artist: 'Alex Thompson',
    artistImage: require('../../assets/tattooartist1.jpg'),
    tattoo: 'Ascending Dragon',
    tattooImage: require('../../assets/tattoos/indir (10).jpg'),
    style: 'Japanese Irezumi',
    price: '$350',
    duration: '3 hours',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
  },
  {
    id: '2',
    studio: 'Art & Soul Tattoo',
    date: '2025-07-01',
    time: '16:30',
    status: 'upcoming',
    address: '456 Art Street, Downtown',
    artist: 'Sarah Lee',
    artistImage: require('../../assets/tattooartist2.jpg'),
    tattoo: 'Vintage American Rose',
    tattooImage: require('../../assets/tattoos/indir (12).jpg'),
    style: 'American Traditional',
    price: '$250',
    duration: '2 hours',
    coordinates: {
      latitude: 40.7328,
      longitude: -73.9867,
    },
  },
  {
    id: '3',
    studio: 'Black Rose Tattoo',
    date: '2025-07-15',
    time: '11:00',
    status: 'upcoming',
    address: '789 Ink Boulevard, East Side',
    artist: 'James Wilson',
    artistImage: require('../../assets/tattooartist5.jpg'),
    tattoo: 'Sacred Geometric Fox',
    tattooImage: require('../../assets/tattoos/indir (14).jpg'),
    style: 'Sacred Geometric',
    price: '$300',
    duration: '2.5 hours',
    coordinates: {
      latitude: 40.7428,
      longitude: -73.9712,
    },
  },
];

export const AppointmentsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
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
      {/* Appointments içeriği aşağıda */}
      <AppointmentsList navigation={navigation} />
    </SafeAreaView>
  );
};

const AppointmentsList = ({ navigation }: any) => {
  return (
    <FlatList
      data={mockAppointments}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: SPACING.md }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Üst kısım - Dövme ve sanatçı bilgileri */}
          <View style={styles.cardHeader}>
            <Image source={item.tattooImage} style={styles.tattooImage} />
            <View style={styles.headerInfo}>
              <View style={styles.studioContainer}>
                <Text style={styles.studio}>{item.studio}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.tattooTitle}>{item.tattoo}</Text>
              <View style={styles.styleTag}>
                <Text style={styles.styleText}>{item.style}</Text>
              </View>
              <View style={styles.artistRow}>
                <Image source={item.artistImage} style={styles.artistImage} />
                <Text style={styles.artist}>{item.artist}</Text>
              </View>
            </View>
          </View>
          
          {/* Orta kısım - Tarih, saat ve adres bilgileri */}
          <View style={styles.cardMiddle}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>{item.date}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>{item.time}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="hourglass" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>{item.duration}</Text>
              </View>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="location" size={16} color={COLORS.secondary} />
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </View>
          
          {/* Alt kısım - Butonlar */}
          <View style={styles.cardFooter}>
            <TouchableOpacity 
              style={styles.footerButton}
              onPress={() => navigation.navigate('AppointmentDetail', { id: item.id })}
            >
              <Ionicons name="information-circle" size={16} color={COLORS.primary} />
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.footerButton}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Map', params: { coordinates: item.coordinates } })}
            >
              <Ionicons name="navigate" size={16} color={COLORS.primary} />
              <Text style={styles.buttonText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.footerButton, styles.rescheduleButton]}
              onPress={() => alert('Reschedule functionality coming soon!')}
            >
              <Ionicons name="calendar" size={16} color={COLORS.white} />
              <Text style={styles.rescheduleText}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tattooImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  studioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  studio: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tattooTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  styleTag: {
    backgroundColor: COLORS.lightGray,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  styleText: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  artist: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  cardMiddle: {
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: COLORS.text,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: 4,
    color: COLORS.secondary,
    fontSize: 13,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    marginLeft: 4,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  rescheduleButton: {
    backgroundColor: COLORS.primary,
  },
  rescheduleText: {
    marginLeft: 4,
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    color: COLORS.primary,
    fontSize: 15,
  },
  tattoo: {
    color: COLORS.secondary,
    fontSize: 14,
  },
});
