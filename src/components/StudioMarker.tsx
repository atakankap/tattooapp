import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { COLORS, SPACING } from '../constants/theme';

interface StudioMarkerProps {
  id?: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  rating: number;
  onPress: () => void;
  selected?: boolean;
}

export const StudioMarker: React.FC<StudioMarkerProps> = ({
  coordinate,
  title,
  rating,
  onPress,
  selected,
}) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={styles.markerContainer}>
        <View style={[styles.marker, selected && { backgroundColor: COLORS.secondary }]} />
      </View>
      <Callout>
        <View style={styles.calloutContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.rating}>Rating: {rating}/5</Text>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  calloutContainer: {
    width: 150,
    padding: SPACING.sm,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  rating: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
});
