import React from 'react';
import { Alert } from 'react-native';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';
import { RootState } from '../store';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: require('../../assets/empty-profile.png'), // local veya default bir boş görsel kullan
  favoriteCount: 12,
  appointmentCount: 3,
};

const mockAppointments = [
  {
    id: '1',
    studio: 'Ink Master Studio',
    date: '2025-06-15',
    time: '14:00',
    status: 'upcoming',
  },
  {
    id: '2',
    studio: 'Art & Soul Tattoo',
    date: '2025-07-01',
    time: '16:30',
    status: 'upcoming',
  },
];

export const ProfileScreen = ({ navigation }: any) => {
  // ...

  const { filteredTattoos } = useSelector((state: RootState) => state.tattoos);
  const favoriteTattoos = filteredTattoos.filter((t) => t.isFavorite);

  const renderProfileHeader = () => (
    <View style={styles.header}>
      <Image source={mockUser.avatar} style={styles.avatar} />
      <Text style={styles.name}>{mockUser.name}</Text>
      <Text style={styles.email}>{mockUser.email}</Text>
      <View style={styles.stats}>
        <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.statNumber}>{favoriteTattoos.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation.navigate('Appointments')}
        >
          <Text style={styles.statNumber}>{mockUser.appointmentCount}</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAppointments = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {mockAppointments.map((appointment) => (
        <TouchableOpacity
          key={appointment.id}
          style={styles.appointmentCard}
          onPress={() => navigation.navigate('AppointmentDetail', { id: appointment.id })}
        >
          <View style={styles.appointmentInfo}>
            <Text style={styles.studioName}>{appointment.studio}</Text>
            <Text style={styles.appointmentDate}>
              {appointment.date} at {appointment.time}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Ionicons name="person-outline" size={24} color={COLORS.text} />
        <Text style={styles.settingText}>Edit Profile</Text>
        <Ionicons name="chevron-forward" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('NotificationSettings')}
      >
        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        <Text style={styles.settingText}>Notifications</Text>
        <Ionicons name="chevron-forward" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('PrivacySettings')}
      >
        <Ionicons name="lock-closed-outline" size={24} color={COLORS.text} />
        <Text style={styles.settingText}>Privacy</Text>
        <Ionicons name="chevron-forward" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderProfileHeader()}
      {renderAppointments()}
      {renderSettings()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: SPACING.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentInfo: {
    flex: 1,
  },
  studioName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  appointmentDate: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
});
