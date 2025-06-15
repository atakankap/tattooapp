import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

export const NotificationSettingsScreen = ({ navigation }: any) => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [inAppNotif, setInAppNotif] = useState(true);
  const [message, setMessage] = useState('');

  const onSave = () => {
    setMessage('Notification preferences saved!');
    setTimeout(() => setMessage(''), 2000);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Email Notifications</Text>
          <Text style={styles.desc}>Get appointment and promo info by email.</Text>
        </View>
        <Switch value={emailNotif} onValueChange={setEmailNotif} />
      </View>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Push Notifications</Text>
          <Text style={styles.desc}>Receive instant alerts on your device.</Text>
        </View>
        <Switch value={pushNotif} onValueChange={setPushNotif} />
      </View>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>SMS Notifications</Text>
          <Text style={styles.desc}>Appointment reminders via SMS.</Text>
        </View>
        <Switch value={smsNotif} onValueChange={setSmsNotif} />
      </View>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>In-App Notifications</Text>
          <Text style={styles.desc}>See updates inside the app.</Text>
        </View>
        <Switch value={inAppNotif} onValueChange={setInAppNotif} />
      </View>
      {!!message && <Text style={styles.success}>{message}</Text>}
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  desc: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 2,
    maxWidth: 200,
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
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
  },
});
