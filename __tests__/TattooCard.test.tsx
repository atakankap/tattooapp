import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TattooCard } from '../src/components/TattooCard';
import { ImageSourcePropType } from 'react-native';

describe('TattooCard', () => {
  it('renders correctly and handles like press', () => {
    const onLikePress = jest.fn();
    const { getByTestId } = render(
      <TattooCard
        imageUrl={{ uri: 'test.jpg' } as ImageSourcePropType}
        title="Test Tattoo"
        style="Blackwork"
        likes={5}
        isFavorite={false}
        onPress={() => {}}
        onLikePress={onLikePress}
      />,
    );
    fireEvent.press(getByTestId('like-button'));
    expect(onLikePress).toHaveBeenCalled();
  });
});
