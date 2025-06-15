import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistConfig } from 'redux-persist';
import type { UserState } from './userSlice';

const userPersistConfig: PersistConfig<UserState> = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['profile', 'location'],
};

export default userPersistConfig;
