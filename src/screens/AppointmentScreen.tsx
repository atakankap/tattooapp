import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  MainTabs: undefined;
  TattooDetail: { id: string };
  ArtistProfile: { id: string };
  Appointment: { tattooId: string };
};

type AppointmentScreenProps = NativeStackScreenProps<RootStackParamList, 'Appointment'>;

export const AppointmentScreen: React.FC<AppointmentScreenProps> = ({ route, navigation }) => {
  const { tattooId } = route.params || {};
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  // Random uygun saat dilimleri (örnek)
  const randomTimes = React.useMemo(() => {
    const today = new Date();
    const baseHour = 10 + Math.floor(Math.random() * 5); // 10-14 arası başlangıç
    return [0, 1, 2].map((offset) => {
      const h = baseHour + offset;
      return `${h.toString().padStart(2, '0')}:00`;
    });
  }, []);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (_event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      setSelectedTime(`${hours}:${minutes}`);
    }
  };

  const handleBook = () => {
    if (!name || !phone || !date || !selectedTime) {
      Alert.alert('Error', 'Please fill all fields and select a time slot.');
      return;
    }
    Alert.alert('Appointment Booked', 'Your appointment request has been sent!');
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      {/* Geri tuşu */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Book Appointment</Text>
      <Text style={styles.label}>Tattoo/Artist ID: {tattooId}</Text>
      <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: date ? COLORS.text : COLORS.secondary }}>
          {date ? date.toLocaleDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>
      {/* Rastgele uygun saat dilimleri */}
      <View style={{ width: '100%', maxWidth: 350, marginBottom: SPACING.md }}>
        <Text style={{ marginBottom: 6, color: COLORS.text, fontWeight: 'bold' }}>
          Available Time Slots
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {randomTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={{
                backgroundColor: selectedTime === time ? COLORS.primary : COLORS.background,
                borderColor: COLORS.primary,
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 14,
              }}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={{ color: selectedTime === time ? COLORS.white : COLORS.text }}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
      <Button title="Confirm Appointment" color={COLORS.primary} onPress={handleBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 20,
    left: 10,
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: SPACING.md,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
});
