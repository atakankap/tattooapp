import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';

export const EditProfileScreen = ({ navigation }: any) => {
  const [avatar, setAvatar] = useState(require('../../assets/empty-profile.png'));
  const [name, setName] = useState('John');
  const [surname, setSurname] = useState('Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [showDate, setShowDate] = useState(false);
  const [error, setError] = useState('');

  const onSave = () => {
    if (!name || !surname || !username || !email) {
      setError('Please fill all required fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    Alert.alert('Saved', 'Profile updated successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image source={avatar} style={styles.avatar} />
        <TouchableOpacity
          style={styles.changePhotoBtn}
          onPress={() => Alert.alert('Change Photo', 'Photo picker coming soon!')}
        >
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="First Name*"
      />
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Last Name*"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username*"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email*"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDate(true)}>
        <Text style={{ color: birthDate ? COLORS.text : COLORS.secondary }}>
          {birthDate ? birthDate.toLocaleDateString() : 'Birth Date'}
        </Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={birthDate || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, d) => {
            setShowDate(false);
            if (d) setBirthDate(d);
          }}
          maximumDate={new Date()}
        />
      )}
      {!!error && <Text style={styles.error}>{error}</Text>}
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TouchableOpacity style={[styles.saveButton, { flex: 1, marginRight: 8 }]} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancelButton, { flex: 1, marginLeft: 8 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 24,
    alignSelf: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
    backgroundColor: COLORS.border,
  },
  changePhotoBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  changePhotoText: {
    color: COLORS.primary,
    fontSize: 13,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cancelButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 6,
    textAlign: 'center',
  },
});
