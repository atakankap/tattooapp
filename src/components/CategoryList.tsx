import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.categoryButton, category === selectedCategory && styles.selectedCategory]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              category === selectedCategory && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
});
