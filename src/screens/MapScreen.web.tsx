import React, { useState } from 'react';
import { COLORS } from '../constants/theme';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Marker ikonunu düzelt
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Studio {
  imageUrl?: string;
  description?: string;
  workingHours?: string;
  address?: string;
  id: string;
  title: string;
  rating: number;
  distance: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const mockStudios: Studio[] = [
  {
    id: '1',
    title: 'Ink Master Studio',
    rating: 4.8,
    distance: '0.5 km',
    coordinate: {
      latitude: 52.2297,
      longitude: 21.0122,
    },
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=500',
    description:
      'One of the best tattoo studios in the city. Specializing in traditional and modern styles.',
    workingHours: 'Mon-Sat: 10:00-20:00',
    address: '123 Main St, City Center',
  },
  {
    id: '2',
    title: 'Art & Soul Tattoo',
    rating: 4.5,
    distance: '1.2 km',
    coordinate: {
      latitude: 52.2315,
      longitude: 21.0201,
    },
    imageUrl: 'https://images.unsplash.com/photo-1598371839873-8ceedd6971e5?w=500',
    description: 'Custom tattoo designs and professional artists with years of experience.',
    workingHours: 'Tue-Sun: 11:00-21:00',
    address: '456 Art Street, Downtown',
  },
  {
    id: '3',
    title: 'Black Rose Tattoo',
    rating: 4.7,
    distance: '0.8 km',
    coordinate: {
      latitude: 52.233,
      longitude: 21.018,
    },
    imageUrl: 'https://images.unsplash.com/photo-1590246814883-57767d078e96?w=500',
    description:
      'Specialized in black and grey realism tattoos. Professional and sterile environment.',
    workingHours: 'Mon-Sun: 12:00-22:00',
    address: '789 Ink Street, East Side',
  },
  {
    id: '4',
    title: 'Electric Needle',
    rating: 4.6,
    distance: '1.5 km',
    coordinate: {
      latitude: 52.228,
      longitude: 21.015,
    },
    imageUrl: 'https://images.unsplash.com/photo-1612875895771-76bba1a61a92?w=500',
    description:
      'Modern studio with experienced artists specializing in colorful and neo-traditional tattoos.',
    workingHours: 'Wed-Sun: 11:00-21:00',
    address: '321 Tattoo Ave, West End',
  },
];

export const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [region] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
  });

  const filteredStudios = mockStudios.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div style={{ flex: 1, background: COLORS.background, height: '100vh' }}>
      <div style={{ padding: 16 }}>
        <input
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '60%' }}
          placeholder="Search studios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <MapContainer
        center={[region.latitude, region.longitude]}
        zoom={13}
        style={{ width: '100%', height: '40vh', marginBottom: 24 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredStudios.map((studio) => (
          <Marker
            key={studio.id}
            position={[studio.coordinate.latitude, studio.coordinate.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <b>{studio.title}</b>
              <br />
              {studio.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
