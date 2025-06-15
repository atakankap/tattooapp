import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

export const PrivacySettingsScreen = ({ navigation }: any) => {
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [searchable, setSearchable] = useState(true);
  const [suggested, setSuggested] = useState(true);
  const [message, setMessage] = useState('');

  const onSave = () => {
    setMessage('Privacy preferences saved!');
    setTimeout(() => setMessage(''), 2000);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Privacy Settings</Text>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Private Profile</Text>
          <Text style={styles.desc}>Only approved followers can see your profile and tattoos.</Text>
        </View>
        <Switch value={profilePrivate} onValueChange={setProfilePrivate} />
      </View>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Show Activity Status</Text>
          <Text style={styles.desc}>Allow others to see when you are online or last active.</Text>
        </View>
        <Switch value={showActivity} onValueChange={setShowActivity} />
      </View>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Appear in Search</Text>
          <Text style={styles.desc}>Allow your profile to be found in search results.</Text>
        </View>
        <Switch value={searchable} onValueChange={setSearchable} />
      </View>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.label}>Appear in Suggestions</Text>
          <Text style={styles.desc}>Show your profile in artist and user suggestions.</Text>
        </View>
        <Switch value={suggested} onValueChange={setSuggested} />
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
