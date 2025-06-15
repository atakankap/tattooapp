import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

interface FilterBarProps {
  onFilterPress: () => void;
  onSortPress: () => void;
  onLayoutPress: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterPress,
  onSortPress,
  onLayoutPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="filter-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={onSortPress}>
          <Ionicons name="swap-vertical-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={onLayoutPress}>
          <Ionicons name="grid-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  filterButton: {
    padding: SPACING.sm,
    marginHorizontal: SPACING.xs,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
});
