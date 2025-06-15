import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const DebugPanel = () => {
  const tattoos = useSelector((state: RootState) => state.tattoos);
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Debug Panel</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.sectionTitle}>Tattoos State</Text>
        <Text selectable style={styles.code}>{JSON.stringify(tattoos, null, 2)}</Text>
        <Text style={styles.sectionTitle}>User State</Text>
        <Text selectable style={styles.code}>{JSON.stringify(user, null, 2)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    margin: 10,
    maxHeight: 240,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  sectionTitle: {
    color: '#ffd700',
    fontWeight: 'bold',
    marginTop: 8,
  },
  code: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  scroll: {
    maxHeight: 180,
  },
});
