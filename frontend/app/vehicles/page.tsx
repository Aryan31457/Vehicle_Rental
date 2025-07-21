'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Vehicle {
  id: number;
  name: string;
  type: string; // Car, Bike, Bicycle
  brand: string;
  model: string;
  year: number;
  color: string;
  capacity: number;
  rate: number;
  status: string;
  branch: {
    id: number;
    name: string;
    city: string;
  };
}

// Mock data with cars, bikes, and bicycles
const mockVehicles: Vehicle[] = [
  // Cars
  {
    id: 1,
    name: 'Luxury Sedan',
    type: 'Car',
    brand: 'Mercedes',
    model: 'E-Class',
    year: 2023,
    color: 'Black',
    capacity: 5,
    rate: 100,
    status: 'available',
    branch: { id: 1, name: 'Downtown Branch', city: 'New York' }
  },
  {
    id: 2,
    name: 'Family SUV',
    type: 'Car',
    brand: 'Toyota',
    model: 'RAV4',
    year: 2023,
    color: 'Silver',
    capacity: 7,
    rate: 80,
    status: 'available',
    branch: { id: 1, name: 'Downtown Branch', city: 'New York' }
  },
  {
    id: 3,
    name: 'Sports Car',
    type: 'Car',
    brand: 'Porsche',
    model: '911',
    year: 2023,
    color: 'Red',
    capacity: 2,
    rate: 200,
    status: 'booked',
    branch: { id: 2, name: 'Airport Branch', city: 'Los Angeles' }
  },
  // Bikes
  {
    id: 4,
    name: 'Adventure Bike',
    type: 'Bike',
    brand: 'Royal Enfield',
    model: 'Himalayan',
    year: 2022,
    color: 'White',
    capacity: 2,
    rate: 40,
    status: 'available',
    branch: { id: 3, name: 'Beach Branch', city: 'Miami' }
  },
  {
    id: 5,
    name: 'Sport Bike',
    type: 'Bike',
    brand: 'Yamaha',
    model: 'YZF-R3',
    year: 2021,
    color: 'Blue',
    capacity: 2,
    rate: 50,
    status: 'available',
    branch: { id: 2, name: 'Airport Branch', city: 'Los Angeles' }
  },
  // Bicycles
  {
    id: 6,
    name: 'Mountain Bicycle',
    type: 'Bicycle',
    brand: 'Giant',
    model: 'Talon',
    year: 2023,
    color: 'Green',
    capacity: 1,
    rate: 15,
    status: 'available',
    branch: { id: 1, name: 'Downtown Branch', city: 'New York' }
  },
  {
    id: 7,
    name: 'City Bicycle',
    type: 'Bicycle',
    brand: 'Trek',
    model: 'FX 1',
    year: 2022,
    color: 'Gray',
    capacity: 1,
    rate: 12,
    status: 'booked',
    branch: { id: 3, name: 'Beach Branch', city: 'Miami' }
  }
];

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || vehicle.type === selectedType;
    const matchesBrand = !selectedBrand || vehicle.brand === selectedBrand;

    return matchesSearch && matchesType && matchesBrand;
  });

  const vehicleTypes = Array.from(new Set(mockVehicles.map((v) => v.type)));
  const vehicleBrands = Array.from(new Set(mockVehicles.map((v) => v.brand)));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Our Impressive Collection of Vehicles</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Choose from a wide range of cars, bikes, and bicycles—carefully selected to provide our customers with the ultimate rental experience.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search vehicles..."
            className="rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-md border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition"
          >
            <option value="">All Types</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="rounded-md border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition"
          >
            <option value="">All Brands</option>
            {vehicleBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-card rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 border border-border flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{vehicle.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      vehicle.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-base text-muted-foreground mb-2">
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>Type: {vehicle.type}</span>
                  <span>Capacity: {vehicle.capacity} {vehicle.type === 'Bicycle' ? 'person' : 'persons'}</span>
                  <span>Location: {vehicle.branch.city}</span>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-xl font-bold text-primary">${vehicle.rate}/day</span>
                  <Link
                    href={`/vehicles/${vehicle.id}`}
                    className="rounded-full bg-primary text-primary-foreground px-5 py-2 font-semibold shadow hover:bg-primary/90 transition"
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground">No vehicles found</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 