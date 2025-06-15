import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './store';
import { AppNavigator } from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { loadFavoritesFromStorage } from './store/persistFavorites';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';

// Favori dövmeleri uygulama başında yükle
const FavoritesLoader: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Favori dövmeleri AsyncStorage'dan yükle
    dispatch<any>(loadFavoritesFromStorage());
  }, [dispatch]);
  return null;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#333" />
            </View>
          }
          persistor={persistor}
        >
          <NavigationContainer>
            <StatusBar style="auto" />
            <FavoritesLoader />
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
