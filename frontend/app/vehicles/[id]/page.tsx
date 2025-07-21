'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Vehicle {
  id: number;
  name: string;
  type: string;
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
    address: string;
  };
}

export default function VehicleDetailPage() {
  const params = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: vehicle, isLoading, error } = useQuery<Vehicle>({
    queryKey: ['vehicle', params.id],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/${params.id}`);
      return data;
    },
  });

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to book a vehicle');
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          vehicleId: vehicle?.id,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Booking created successfully!');
      // Redirect to booking confirmation page
    } catch (error) {
      toast.error('Error creating booking. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-red-800">Error loading vehicle details</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Vehicle Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {vehicle.brand} {vehicle.model} ({vehicle.year})
            </p>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900">Vehicle Details</h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Color</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.color}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vehicle.capacity} persons</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Daily Rate</dt>
                  <dd className="mt-1 text-sm text-gray-900">${vehicle.rate}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900">Branch Location</h2>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{vehicle.branch.name}</p>
                <p className="mt-1 text-sm text-gray-500">{vehicle.branch.address}</p>
                <p className="mt-1 text-sm text-gray-500">{vehicle.branch.city}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Book this vehicle</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleBooking}
                    disabled={!startDate || !endDate || vehicle.status !== 'available'}
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {vehicle.status === 'available' ? 'Book Now' : 'Not Available'}
                  </button>
                </div>

                {vehicle.status !== 'available' && (
                  <p className="mt-2 text-sm text-red-600">
                    This vehicle is currently not available for booking
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 