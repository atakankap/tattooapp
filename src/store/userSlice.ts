import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  profile: {
    name: string;
    email?: string;
    avatar?: string;
    savedDesigns: string[];
  };
  location: {
    latitude: number | null;
    longitude: number | null;
  };
}

const initialState: UserState = {
  profile: {
    name: '',
    email: undefined,
    avatar: undefined,
    savedDesigns: [],
  },
  location: {
    latitude: null,
    longitude: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserState['profile']>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.location = action.payload;
    },
    saveDesign: (state, action: PayloadAction<string>) => {
      if (!state.profile.savedDesigns.includes(action.payload)) {
        state.profile.savedDesigns.push(action.payload);
      }
    },
    removeDesign: (state, action: PayloadAction<string>) => {
      state.profile.savedDesigns = state.profile.savedDesigns.filter((id) => id !== action.payload);
    },
  },
});

export const { updateProfile, setLocation, saveDesign, removeDesign } = userSlice.actions;

// Güvenli e-posta saklama için thunk
import { saveToSecureStore } from '../utils/secure';
import { AppDispatch } from './index';

export const updateProfileSecure =
  (profile: Partial<UserState['profile']>) => async (dispatch: AppDispatch) => {
    dispatch(updateProfile(profile));
    if (profile && typeof profile === 'object' && 'email' in profile && profile.email) {
      await saveToSecureStore('user_email', profile.email!);
    }
  };

export default userSlice.reducer;
