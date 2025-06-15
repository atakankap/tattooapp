import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

/**
 * Tattoo data model
 */
export interface Tattoo {
  id: string;
  imageUrl: ImageSourcePropType;
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

/**
 * Redux store state structure for tattoos
 */
export interface TattoosState {
  allTattoos: Tattoo[];
  filteredTattoos: Tattoo[];
  searchQuery: string;
  error?: string;
}

// File names in assets/tattoos directory
const tattooImages = [
  require('../../assets/tattoos/indir (10).jpg'),
  require('../../assets/tattoos/indir (11).jpg'),
  require('../../assets/tattoos/indir (12).jpg'),
  require('../../assets/tattoos/indir (13).jpg'),
  require('../../assets/tattoos/indir (14).jpg'),
  require('../../assets/tattoos/indir (15).jpg'),
  require('../../assets/tattoos/indir (16).jpg'),
  require('../../assets/tattoos/indir (17).jpg'),
  require('../../assets/tattoos/indir (18).jpg'),
  require('../../assets/tattoos/indir (19).jpg'),
  require('../../assets/tattoos/indir (3).jpg'),
  require('../../assets/tattoos/indir (4).jpg'),
  require('../../assets/tattoos/indir (5).jpg'),
  require('../../assets/tattoos/indir (6).jpg'),
  require('../../assets/tattoos/indir.jpg'),
  require('../../assets/tattoos/indir111.jpg'),
  require('../../assets/tattoos/indir12.jpg'),
  require('../../assets/tattoos/indir23 (1).jpg'),
  require('../../assets/tattoos/indir23 (2).jpg'),
  require('../../assets/tattoos/indir23 (3).jpg'),
  require('../../assets/tattoos/indir23 (4).jpg'),
  require('../../assets/tattoos/indir282.jpg'),
  require('../../assets/tattoos/indir32.jpg'),
  require('../../assets/tattoos/indir55.jpg'),
  require('../../assets/tattoos/indir854.jpg'),
  require('../../assets/tattoos/indir9832.jpg'),
  require('../../assets/tattoos/indir99.jpg'),
  // Newly added JPEG files
  require('../../assets/tattoos/indir321.jpeg'),
  require('../../assets/tattoos/indir45665149.jpeg'),
  require('../../assets/tattoos/indir4578454.jpeg'),
  require('../../assets/tattoos/indir474554.jpeg'),
  require('../../assets/tattoos/indir47814551651.jpeg'),
  require('../../assets/tattoos/indir74514774.jpeg'),
  require('../../assets/tattoos/indir7469.jpeg'),
  require('../../assets/tattoos/indir7887.jpeg'),
  require('../../assets/tattoos/indir8565.jpeg'),
  require('../../assets/tattoos/indir89632.jpeg'),
];

// Different styles for tattoo categories - Daha detaylı stil tanımları
const styles = [
  'Mixed Media', 'Japanese Irezumi', 'American Traditional', 'Tribal Polynesian', 'Blackwork Shadow', 
  'Photorealism', 'Watercolor Splash', 'Neo-Traditional', 'Fine Dotwork', 'Delicate Linework', 
  'Sacred Geometric', 'Old School Classic', 'Minimalist', 'Surrealist', 'Floral Art', 'Script Lettering',
  'Ornamental', 'Abstract Modern', 'Illustrative', 'Sketch Style', 'Trash Polka', 'Biomechanical'
];

// Tattoo categories
const categories = [
  'Geometric', 'Animals', 'Floral', 'Lettering', 'Minimalist', 'Portraits', 'Abstract',
  'Skull', 'Dragon', 'Mandala', 'Sleeve', 'Butterfly', 'Snake', 'Wolf'
];

// Tattoo names - Daha özgün ve detaylı başlıklar
const tattooNames = [
  'Ascending Dragon', 'Howling Wolf Spirit', 'Sacred Geometric Fox', 'Cherry Blossom Sleeve',
  'Minimalist Alpine Peaks', 'Ocean Wave Abstract', 'Vintage American Rose', 'Intricate Mandala Art',
  'Celestial Butterfly', 'Watercolor Hummingbird', 'Majestic Lion Portrait', 'Sailor Anchor Journey',
  'Venomous Snake Design', 'Enchanted Forest Lines', 'Geometric Stag Silhouette', 'Swimming Koi Fish',
  'Rising Phoenix Fire', 'Dark Skull and Roses', 'Wanderer Compass', 'Surreal Face Contours',
  'Bleeding Heart Classic', 'Sacred Geometry Pattern', 'Crescent Moon Phase', 'Cosmic Galaxy Splash',
  'Alpha Wolf Silhouette', 'Sailor Swallow Return', 'Cunning Fox Spirit', 'Mountain Range Horizon',
  'Geometric Grizzly', 'Honorable Samurai Warrior', 'Tribal Sun Rays', 'Lotus Flower Mandala',
  'Minimalist Ocean Wave', 'Dreamscape Landscape', 'Ornate Dagger Design', 'Shadow Portrait Art',
  'Navigator Compass', 'Blooming Lotus Watercolor', 'Bengal Tiger Prowl', 'Voyager Ship',
  'Night Owl Guardian', 'Celestial Star Map', 'Majestic Whale Breach', 'Oni Demon Mask'
];

// Artist names list
const artistNames = [
  'John Doe', 'Jane Smith', 'Michael Brown', 'Emily Johnson', 'William Davis',
  'Olivia Miller', 'James Wilson', 'Sophia Anderson', 'David Thompson', 'Jessica Taylor',
  'Robert Lee', 'Mia Martin', 'Richard White', 'Isabella Harris', 'Charles Lewis',
  'Abigail Walker', 'Joseph Hall', 'Lily Patel', 'Kevin Brooks', 'Ava Jenkins'
];

// Special mappings - appropriate category and style combinations for each tattoo
// Distributing tattoos across all categories and styles
const tattooData = [
  // Geometric category
  { style: 'Geometric', category: 'Geometric', title: 'Geometric Mandala' },
  { style: 'Blackwork', category: 'Geometric', title: 'Blackwork Geometric' },
  { style: 'Dotwork', category: 'Geometric', title: 'Dotwork Geometric Pattern' },
  
  // Animals category
  { style: 'Japanese', category: 'Animals', title: 'Japanese Koi' },
  { style: 'Tribal', category: 'Animals', title: 'Tribal Phoenix' },
  { style: 'Geometric', category: 'Animals', title: 'Geometric Fox' },
  { style: 'Realism', category: 'Animals', title: 'Realistic Lion' },
  { style: 'Watercolor', category: 'Animals', title: 'Watercolor Bird' },
  { style: 'Old School', category: 'Animals', title: 'Old School Swallow' },
  { style: 'Neo-Traditional', category: 'Animals', title: 'Neo-Traditional Fox' },
  
  // Floral category
  { style: 'Traditional', category: 'Floral', title: 'Traditional Rose' },
  { style: 'Watercolor', category: 'Floral', title: 'Watercolor Lotus' },
  { style: 'Dotwork', category: 'Floral', title: 'Floral Mandala' },
  { style: 'Abstract', category: 'Floral', title: 'Abstract Floral' },
  
  // Lettering category
  { style: 'Traditional', category: 'Lettering', title: 'Traditional Script' },
  { style: 'Minimalist', category: 'Lettering', title: 'Minimalist Lettering' },
  { style: 'Old School', category: 'Lettering', title: 'Old School Anchor' },
  { style: 'Linework', category: 'Lettering', title: 'Linework Constellation' },
  { style: 'Dotwork', category: 'Lettering', title: 'Dotwork Compass' },
  
  // Minimalist category
  { style: 'Minimalist', category: 'Minimalist', title: 'Minimalist Mountain' },
  { style: 'Minimalist', category: 'Minimalist', title: 'Minimalist Wave' },
  { style: 'Minimalist', category: 'Minimalist', title: 'Minimalist Compass' },
  { style: 'Tribal', category: 'Minimalist', title: 'Tribal Sun' },
  
  // Portraits category
  { style: 'Japanese', category: 'Portraits', title: 'Japanese Samurai' },
  { style: 'Abstract', category: 'Portraits', title: 'Abstract Face' },
  { style: 'Blackwork', category: 'Portraits', title: 'Blackwork Portrait' },
  { style: 'Realism', category: 'Portraits', title: 'Realistic Portrait' },
  
  // Abstract category
  { style: 'Abstract', category: 'Abstract', title: 'Abstract Waves' },
  { style: 'Japanese', category: 'Abstract', title: 'Japanese Mask' },
  { style: 'Minimalist', category: 'Abstract', title: 'Minimalist Abstract' },
  { style: 'Watercolor', category: 'Abstract', title: 'Watercolor Galaxy' },
  { style: 'Linework', category: 'Abstract', title: 'Linework Forest' },
  { style: 'Old School', category: 'Abstract', title: 'Old School Ship' },
  
  // Skull category
  { style: 'Traditional', category: 'Skull', title: 'Skull and Roses' },
  { style: 'Blackwork', category: 'Skull', title: 'Blackwork Skull' },
  { style: 'Realism', category: 'Skull', title: 'Realistic Skull' },
  { style: 'Old School', category: 'Skull', title: 'Old School Skull' },
  
  // Dragon category
  { style: 'Japanese', category: 'Dragon', title: 'Japanese Dragon' },
  { style: 'Tribal', category: 'Dragon', title: 'Tribal Dragon' },
  { style: 'Neo-Traditional', category: 'Dragon', title: 'Neo-Traditional Dragon' },
  
  // Mandala category
  { style: 'Blackwork', category: 'Mandala', title: 'Blackwork Mandala' },
  { style: 'Dotwork', category: 'Mandala', title: 'Dotwork Mandala' },
  { style: 'Geometric', category: 'Mandala', title: 'Geometric Mandala Art' },
  
  // Sleeve category
  { style: 'Traditional', category: 'Sleeve', title: 'Floral Sleeve' },
  { style: 'Japanese', category: 'Sleeve', title: 'Japanese Sleeve' },
  { style: 'Blackwork', category: 'Sleeve', title: 'Blackwork Sleeve' },
  { style: 'Neo-Traditional', category: 'Sleeve', title: 'Neo-Traditional Sleeve' },
  
  // Butterfly category
  { style: 'Dotwork', category: 'Butterfly', title: 'Dotwork Butterfly' },
  { style: 'Watercolor', category: 'Butterfly', title: 'Watercolor Butterfly' },
  { style: 'Traditional', category: 'Butterfly', title: 'Traditional Butterfly' },
  
  // Snake category
  { style: 'Neo-Traditional', category: 'Snake', title: 'Neo-Traditional Snake' },
  { style: 'Japanese', category: 'Snake', title: 'Japanese Snake' },
  { style: 'Traditional', category: 'Snake', title: 'Traditional Snake' },
  
  // Wolf category
  { style: 'Tribal', category: 'Wolf', title: 'Tribal Wolf' },
  { style: 'Realism', category: 'Wolf', title: 'Realistic Wolf' },
  { style: 'Geometric', category: 'Wolf', title: 'Geometric Wolf' },
  
  // Traditional style specific tattoos
  { style: 'Traditional', category: 'Traditional', title: 'Traditional American Eagle' },
  { style: 'Traditional', category: 'Traditional', title: 'Traditional Sailor Jerry' },
  { style: 'Traditional', category: 'Traditional', title: 'Traditional Pin-up Girl' },
  { style: 'Traditional', category: 'Traditional', title: 'Traditional Nautical Star' },
  
  // Japanese style specific tattoos
  { style: 'Japanese', category: 'Japanese', title: 'Japanese Hannya Mask' },
  { style: 'Japanese', category: 'Japanese', title: 'Japanese Cherry Blossom' },
  { style: 'Japanese', category: 'Japanese', title: 'Japanese Geisha' },
  { style: 'Japanese', category: 'Japanese', title: 'Japanese Wave' },
  
  // Tribal style specific tattoos
  { style: 'Tribal', category: 'Tribal', title: 'Tribal Maori Pattern' },
  { style: 'Tribal', category: 'Tribal', title: 'Tribal Polynesian' },
  { style: 'Tribal', category: 'Tribal', title: 'Tribal Armband' },
  { style: 'Tribal', category: 'Tribal', title: 'Tribal Celtic Knot' },
  
  // Blackwork style specific tattoos
  { style: 'Blackwork', category: 'Blackwork', title: 'Blackwork Ornamental' },
  { style: 'Blackwork', category: 'Blackwork', title: 'Blackwork Dotwork Fusion' },
  { style: 'Blackwork', category: 'Blackwork', title: 'Blackwork Geometric' },
  { style: 'Blackwork', category: 'Blackwork', title: 'Blackwork Floral' },
  
  // Realism style specific tattoos
  { style: 'Realism', category: 'Realism', title: 'Realistic Portrait' },
  { style: 'Realism', category: 'Realism', title: 'Realistic Nature Scene' },
  { style: 'Realism', category: 'Realism', title: 'Realistic Animal' },
  { style: 'Realism', category: 'Realism', title: 'Realistic Landscape' },
  
  // Watercolor style specific tattoos
  { style: 'Watercolor', category: 'Watercolor', title: 'Watercolor Abstract' },
  { style: 'Watercolor', category: 'Watercolor', title: 'Watercolor Floral' },
  { style: 'Watercolor', category: 'Watercolor', title: 'Watercolor Feather' },
  { style: 'Watercolor', category: 'Watercolor', title: 'Watercolor Splash' },
  
  // Mixed style specific tattoos
  { style: 'Mixed', category: 'Animals', title: 'Mixed Style Animal' },
  { style: 'Mixed', category: 'Abstract', title: 'Mixed Style Abstract' },
  { style: 'Mixed', category: 'Floral', title: 'Mixed Style Floral' },
  
  // Additional tattoos - various combinations
  { style: 'Geometric', category: 'Animals', title: 'Geometric Deer' },
  { style: 'Geometric', category: 'Animals', title: 'Geometric Bear' },
  { style: 'Geometric', category: 'Animals', title: 'Geometric Whale' },
  { style: 'Realism', category: 'Animals', title: 'Realistic Tiger' },
  { style: 'Neo-Traditional', category: 'Animals', title: 'Neo-Traditional Owl' },
  { style: 'Linework', category: 'Abstract', title: 'Linework Mountains' },
];

// Kategorilere göre dövme dağılımını düzenleme
const ensureCategoryDistribution = (tattoos: Tattoo[]): Tattoo[] => {
  const targetCategories = ['Geometric', 'Animals', 'Floral', 'Lettering'];
  const result = [...tattoos];
  
  // Her kategoriden kaç tane var kontrol et
  const categoryCounts: Record<string, number> = {};
  result.forEach(tattoo => {
    if (targetCategories.includes(tattoo.category)) {
      categoryCounts[tattoo.category] = (categoryCounts[tattoo.category] || 0) + 1;
    }
  });
  
  // Her kategoride en az 3 dövme olduğundan emin ol
  targetCategories.forEach(category => {
    if (!categoryCounts[category] || categoryCounts[category] < 3) {
      // Kaç tane daha eklenmesi gerekiyor
      const needToAdd = 3 - (categoryCounts[category] || 0);
      
      // O kategoriye ait dövmeler ekle
      for (let i = 0; i < needToAdd; i++) {
        // Mevcut dövmelerden birini kopyala ve kategorisini değiştir
        const sourceTattoo = result[Math.floor(Math.random() * result.length)];
        const newTattoo = {
          ...sourceTattoo,
          id: `tattoo-${category}-${i}`,
          category: category,
          title: `${category} Tattoo ${i+1}`,
          likes: Math.floor(Math.random() * 100) + 5,
          isFavorite: Math.random() > 0.7,
        };
        result.push(newTattoo);
      }
    }
  });
  
  return result;
};

// Distribute tattoos so each category has at least 3 tattoos
// Distribute tattoos so each category has at least 3 tattoos
const initialTattoos: Tattoo[] = [
  // Specially matched tattoo data for each image
  ...tattooImages.map((img, idx) => {
    // Check index bounds
    const dataIdx = idx % tattooData.length;
    const data = tattooData[dataIdx];
    
    // Dövme başlığı için tattooNames dizisinden özgün bir başlık seçiyoruz
    const title = tattooNames[idx % tattooNames.length];
    
    // Stil için styles dizisinden dövme kategorisine uygun bir stil seçiyoruz
    // Kategoriye göre stil seçimi yaparak daha tutarlı eşleşmeler sağlıyoruz
    let style = data.style;
    if (data.category === 'Geometric') {
      style = ['Sacred Geometric', 'Minimalist', 'Delicate Linework'][Math.floor(Math.random() * 3)];
    } else if (data.category === 'Animals') {
      style = ['Photorealism', 'Neo-Traditional', 'Illustrative'][Math.floor(Math.random() * 3)];
    } else if (data.category === 'Floral') {
      style = ['Watercolor Splash', 'Floral Art', 'Delicate Linework'][Math.floor(Math.random() * 3)];
    } else if (data.category === 'Lettering') {
      style = ['Script Lettering', 'Old School Classic', 'Minimalist'][Math.floor(Math.random() * 3)];
    }
    
    return {
      id: `tattoo-${idx}`,
      imageUrl: img,
      title: title,
      likes: Math.floor(Math.random() * 500) + 50,
      isFavorite: Math.random() > 0.8,
      category: data.category,
      artist: artistNames[idx % artistNames.length],
      style: style,
      bodyPart: ['Arm', 'Back', 'Leg', 'Chest', 'Shoulder'][idx % 5],
      views: Math.floor(Math.random() * 2000) + 100,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    };
  })
];

// Her kategoride yeteri sayıda dövme olduğundan emin ol
const mockTattoos = ensureCategoryDistribution(initialTattoos);

// Setting up to use mockTattoos at each app startup
const initialState: TattoosState = {
  allTattoos: mockTattoos,
  filteredTattoos: mockTattoos,
  searchQuery: '',
};

// API data fetching operations are disabled.
// import { createAsyncThunk } from '@reduxjs/toolkit';
// export const fetchTattoosAsync = createAsyncThunk(
//   'tattoos/fetchTattoos',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://mockapi.io/api/v1/tattoos'); // example endpoint
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'An unexpected error occurred');
//     }
//   },
// );

// Debug function to log tattoo categories and counts
const logTattooCategories = (tattoos: Tattoo[]) => {
  const categoryCounts: Record<string, number> = {};
  tattoos.forEach(tattoo => {
    if (tattoo.category) {
      categoryCounts[tattoo.category] = (categoryCounts[tattoo.category] || 0) + 1;
    }
  });
  console.log('Tattoo categories:', categoryCounts);
};

// Log initial categories
logTattooCategories(mockTattoos);

// Önemli kategorileri kontrol et
const mainCategories = ['Geometric', 'Animals', 'Floral', 'Lettering'];
const mainCategoryCounts = mainCategories.map(cat => {
  const count = mockTattoos.filter(t => t.category === cat).length;
  return { category: cat, count };
});
console.log('Main categories distribution:', mainCategoryCounts);

export const tattoosSlice = createSlice({
  name: 'tattoos',
  initialState,
  reducers: {
    /**
     * Adds or removes a tattoo from favorites, updates like count.
     * @param state Redux state
     * @param action Tattoo id (string)
     */
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const tattoo = state.allTattoos.find((t) => t.id === action.payload);
      if (tattoo) {
        if (tattoo.isFavorite) {
          tattoo.isFavorite = false;
          tattoo.likes = Math.max(0, tattoo.likes - 1);
        } else {
          tattoo.isFavorite = true;
          tattoo.likes = tattoo.likes + 1;
        }
      }
      
      // Apply current search filter
      if (state.searchQuery.trim() === '') {
        state.filteredTattoos = state.allTattoos;
      } else {
        const query = state.searchQuery.toLowerCase();
        state.filteredTattoos = state.allTattoos.filter(t => 
          (t.artist && t.artist.toLowerCase().includes(query)) ||
          (t.category && t.category.toLowerCase().includes(query)) ||
          (t.title && t.title.toLowerCase().includes(query)) ||
          (t.style && t.style.toLowerCase().includes(query))
        );
      }
    },
    /**
     * Updates search query and determines filtered tattoos.
     * @param state Redux state
     * @param action Search query (string)
     */
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      
      if (action.payload.trim() === '') {
        state.filteredTattoos = state.allTattoos;
      } else {
        const query = action.payload.toLowerCase();
        state.filteredTattoos = state.allTattoos.filter(t => 
          (t.artist && t.artist.toLowerCase().includes(query)) ||
          (t.category && t.category.toLowerCase().includes(query)) ||
          (t.title && t.title.toLowerCase().includes(query)) ||
          (t.style && t.style.toLowerCase().includes(query))
        );
        
        // Debug log for search results
        console.log(`Search query "${query}" returned ${state.filteredTattoos.length} results`);
        logTattooCategories(state.filteredTattoos);
      }
    },
  },
  // extraReducers removed, only mockTattoos will be used.
});

export const { toggleFavorite, updateSearchQuery } = tattoosSlice.actions;

// Thunk: Favorite update and save
import { AppDispatch, RootState } from './index';
import { saveFavoritesToStorage } from './persistFavorites';

export const toggleFavoriteAndPersist =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(toggleFavorite(id));
    saveFavoritesToStorage(getState());
  };

export default tattoosSlice.reducer;
