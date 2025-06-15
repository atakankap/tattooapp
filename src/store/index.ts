import { configureStore } from '@reduxjs/toolkit';
import tattoosReducer from './tattoosSlice';
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import tattoosPersistConfig from './persistConfig';
import userPersistConfig from './persistUserConfig';

// ImageSourcePropType serileştirilemediği için tattoos için persist işlemini devre dışı bırakıyoruz
// const persistedTattoosReducer = persistReducer(tattoosPersistConfig, tattoosReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    tattoos: tattoosReducer, // Doğrudan reducer kullanıyoruz, persist olmadan
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
