import tattoosReducer, { toggleFavorite } from '../src/store/tattoosSlice';
import { TattoosState } from '../src/types';

describe('tattoosSlice', () => {
  const initialState: TattoosState = {
    allTattoos: [
      { 
        id: '1', 
        isFavorite: false, 
        imageUrl: '', 
        title: 'Test Tattoo 1',
        likes: 0,
        category: 'Test',
        artist: 'Test Artist',
        style: 'Test Style',
        bodyPart: 'Arm'
      },
      { 
        id: '2', 
        isFavorite: true, 
        imageUrl: '',
        title: 'Test Tattoo 2',
        likes: 5,
        category: 'Test',
        artist: 'Test Artist',
        style: 'Test Style',
        bodyPart: 'Leg'
      },
    ],
    filteredTattoos: [],
    searchQuery: '',
    favorites: ['2']
  };

  it('should toggle favorite', () => {
    const nextState = tattoosReducer(initialState, toggleFavorite('1'));
    expect(nextState.allTattoos[0].isFavorite).toBe(true);
    expect(nextState.allTattoos[1].isFavorite).toBe(true);
  });
});
