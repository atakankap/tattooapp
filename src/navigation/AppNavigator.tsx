import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import { TattooLibraryScreen } from '../screens/TattooLibraryScreen';
import { MapScreen } from '../screens/MapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TattooDetailScreen } from '../screens/TattooDetailScreen';
import { ArtistsScreen } from '../screens/ArtistsScreen';
import { ArtistProfileScreen } from '../screens/ArtistProfileScreen';
import { AppointmentScreen } from '../screens/AppointmentScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { AppointmentDetailScreen } from '../screens/AppointmentDetailScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { PrivacySettingsScreen } from '../screens/PrivacySettingsScreen';
import { LoginScreen } from '../screens/LoginScreen';

type TabParamList = {
  Discover: undefined;
  Artists: undefined;
  Map: undefined;
  Profile: undefined;
};

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  TattooDetail: { id: string };
  ArtistProfile: { id: string };
  Appointment: { tattooId: string };
  Favorites: undefined;
  Appointments: undefined;
  AppointmentDetail: { id: string };
  EditProfile: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Artists') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Discover" component={TattooLibraryScreen} />
      <Tab.Screen name="Artists" component={ArtistsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="TattooDetail" component={TattooDetailScreen} />
      <Stack.Screen name="ArtistProfile" component={ArtistProfileScreen} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
    </Stack.Navigator>
  );
};
