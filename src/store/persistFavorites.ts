import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState } from './index';
import { toggleFavorite } from './tattoosSlice';

const FAVORITES_KEY = 'FAVORITE_TATTOO_IDS';

/**
 * Saves favorite tattoos to AsyncStorage.
 */
export const saveFavoritesToStorage = async (state: RootState) => {
  const favoriteIds = state.tattoos.allTattoos.filter((t) => t.isFavorite).map((t) => t.id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
};

/**
 * Loads favorite tattoos from AsyncStorage and processes them in the store.
 */
export const loadFavoritesFromStorage =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    if (favoritesJson) {
      const favoriteIds: string[] = JSON.parse(favoritesJson);
      favoriteIds.forEach((id) => {
        // Add to favorites if not already favorite
        const tattoo = getState().tattoos.allTattoos.find((t) => t.id === id);
        if (tattoo && !tattoo.isFavorite) {
          dispatch(toggleFavorite(id));
        }
      });
    }
  };
