// Define the main types used throughout the application

// Tattoo related types
export interface Tattoo {
  id: string;
  imageUrl: any; // ImageSourcePropType from react-native
  title: string;
  likes: number;
  isFavorite: boolean;
  category: string;
  artist: string;
  style: string;
  bodyPart: string;
  views?: number;
  createdAt?: string;
}

export interface TattoosState {
  allTattoos: Tattoo[];
  filteredTattoos: Tattoo[];
  searchQuery: string;
  favorites?: string[];
}

// User related types
export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  savedDesigns: any[];
}

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface UserState {
  profile: UserProfile;
  location: UserLocation;
}

// Artist related types
export interface Artist {
  id: string;
  name: string;
  studio: string;
  rating: number;
  experience: string;
  specialties: string[];
  imageUrl: any; // For React Native image source
  coverImageUrl: any;
  tattooCount: number;
  followersCount: number;
  bio: string;
  location: string;
  phone: string;
  workingHours: string;
  priceRange: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  gallery: {
    id: string;
    imageUrl: any;
    likes: number;
  }[];
  reviews: {
    id: string;
    user: string;
    rating: number;
    date: string;
    comment: string;
    userImage: any;
  }[];
}

// Navigation types
export interface ArtistProfileScreenProps {
  route: {
    params: {
      id: string;
    };
  };
  navigation: any;
}
