import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

const mockAppointments = [
  {
    id: '1',
    studio: 'Ink Master Studio',
    date: '2025-06-15',
    time: '14:00',
    status: 'upcoming',
    address: '123 Main St, City Center',
    artist: 'Alex Thompson',
    tattoo: 'Dragon Sleeve',
    notes: 'Please arrive 10 minutes early.',
  },
  {
    id: '2',
    studio: 'Art & Soul Tattoo',
    date: '2025-07-01',
    time: '16:30',
    status: 'upcoming',
    address: '456 Art Street, Downtown',
    artist: 'Sarah Lee',
    tattoo: 'Rose',
    notes: 'Bring reference pictures.',
  },
];

export const AppointmentDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const appointment = mockAppointments.find((a) => a.id === id);
  if (!appointment) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Appointment Details</Text>
      <Text style={styles.studio}>{appointment.studio}</Text>
      <Text style={styles.date}>
        {appointment.date} at {appointment.time}
      </Text>
      <Text style={styles.artist}>Artist: {appointment.artist}</Text>
      <Text style={styles.tattoo}>Tattoo: {appointment.tattoo}</Text>
      <Text style={styles.address}>{appointment.address}</Text>
      <Text style={styles.notes}>{appointment.notes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 50,
    marginBottom: 12,
  },
  studio: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 2,
  },
  date: {
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 2,
  },
  artist: {
    color: COLORS.secondary,
    fontSize: 15,
    marginBottom: 2,
  },
  tattoo: {
    color: COLORS.secondary,
    fontSize: 15,
    marginBottom: 2,
  },
  address: {
    color: COLORS.secondary,
    fontSize: 14,
    marginBottom: 8,
  },
  notes: {
    color: COLORS.text,
    fontSize: 13,
    marginTop: 10,
  },
});
