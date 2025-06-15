import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistConfig } from 'redux-persist';
import type { TattoosState } from './tattoosSlice';

const tattoosPersistConfig: PersistConfig<TattoosState> = {
  key: 'tattoos',
  storage: AsyncStorage,
  whitelist: ['allTattoos', 'filteredTattoos', 'searchQuery'],
};

export default tattoosPersistConfig;
