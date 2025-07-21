'use client';

import { useState } from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  email: string;
  hours: string;
  image: string;
  types: string[];
}

const locations: Location[] = [
  {
    id: 1,
    name: 'Downtown Branch',
    address: '123 Main Street',
    city: 'New York',
    phoneNumber: '+1 (555) 123-4567',
    email: 'downtown@luxedrive.com',
    hours: 'Mon-Sun: 8:00 AM - 8:00 PM',
    image: '/location-downtown.jpg',
    types: ['Car', 'Bike', 'Bicycle'],
  },
  {
    id: 2,
    name: 'Airport Branch',
    address: '456 Airport Road',
    city: 'Los Angeles',
    phoneNumber: '+1 (555) 234-5678',
    email: 'airport@luxedrive.com',
    hours: '24/7',
    image: '/location-airport.jpg',
    types: ['Car', 'Bike'],
  },
  {
    id: 3,
    name: 'Beach Branch',
    address: '789 Ocean Drive',
    city: 'Miami',
    phoneNumber: '+1 (555) 345-6789',
    email: 'beach@luxedrive.com',
    hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    image: '/location-beach.jpg',
    types: ['Car', 'Bicycle'],
  },
];

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = locations.filter((location) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      location.name.toLowerCase().includes(searchLower) ||
      location.city.toLowerCase().includes(searchLower) ||
      location.address.toLowerCase().includes(searchLower);

    const matchesCity = !selectedCity || location.city === selectedCity;
    const matchesType = !selectedType || location.types.includes(selectedType);

    return matchesSearch && matchesCity && matchesType;
  });

  const cities = Array.from(new Set(locations.map((l) => l.city)));
  const types = Array.from(new Set(locations.flatMap((l) => l.types)));

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4 text-center">Our Locations</h1>
        <p className="text-base text-muted-foreground mb-12 text-center">Find a LuxeDrive branch near you and rent a car, bike, or bicycle with ease.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLocations.map((loc) => (
            <div key={loc.name} className="bg-card rounded-2xl border border-border shadow p-6 flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-foreground">{loc.name}</h2>
              <p className="text-base text-muted-foreground">{loc.city}</p>
              <p className="text-sm text-muted-foreground">{loc.address}</p>
              <p className="text-sm text-muted-foreground">Phone: {loc.phoneNumber}</p>
              <p className="text-sm text-muted-foreground">Email: {loc.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {loc.types.map((type) => (
                  <span key={type} className="px-3 py-1 rounded-full bg-muted text-foreground text-xs font-medium border border-border">{type}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 