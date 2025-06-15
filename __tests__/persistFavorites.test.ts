import { saveFavoritesToStorage, loadFavoritesFromStorage } from '../src/store/persistFavorites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TattoosState, UserState } from '../src/types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Define the PersistPartial interface that's required by redux-persist
interface PersistPartial {
  _persist: { version: number; rehydrated: boolean };
}

type RootState = {
  tattoos: TattoosState;
  user: UserState & PersistPartial;
};

describe('persistFavorites', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  it('should save and load favorites', async () => {
    // Create a mock state that includes the _persist property
    const mockState = {
      tattoos: { allTattoos: [], filteredTattoos: [], searchQuery: '', favorites: ['1','2'] },
      user: { 
        profile: { name: '', email: '', avatar: '', savedDesigns: [] }, 
        location: { latitude: null, longitude: null },
        _persist: { version: 1, rehydrated: true }
      },
    } as RootState;
    
    await saveFavoritesToStorage(mockState);
    
    // Simulate Redux dispatch with proper types
    let loadedIds: string[] = [];
    const mockDispatch = ((id: string) => {
      loadedIds.push(id);
      return loadedIds.length;
    }) as unknown as ThunkDispatch<RootState, undefined, AnyAction>;
    
    await loadFavoritesFromStorage()(mockDispatch, () => mockState);
    expect(loadedIds).toContain('1');
    expect(loadedIds).toContain('2');
  });
});
