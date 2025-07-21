'use client';

import { useState } from 'react';
import { UserCircleIcon, CalendarIcon, CarIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: number;
  vehicle: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    vehicle: 'Mercedes E-Class',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    status: 'Completed',
    totalAmount: 500,
  },
  {
    id: 2,
    vehicle: 'Toyota RAV4',
    startDate: '2024-04-01',
    endDate: '2024-04-05',
    status: 'Upcoming',
    totalAmount: 320,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center space-x-4">
            <UserCircleIcon className="h-16 w-16 text-gray-400" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>

          <div className="mt-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === 'bookings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Booking History
              </button>
            </nav>
          </div>

          {activeTab === 'profile' ? (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue="John Doe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    defaultValue="123 Main St, New York, NY 10001"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {mockBookings.map((booking) => (
                    <li key={booking.id} className="py-6">
                      <div className="flex items-center space-x-4">
                        <CarIcon className="h-8 w-8 text-gray-400" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {booking.vehicle}
                          </p>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4" />
                            <p>
                              {booking.startDate} - {booking.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-medium text-gray-900">
                            ${booking.totalAmount}
                          </p>
                          <p
                            className={`mt-1 text-xs font-medium ${
                              booking.status === 'Completed'
                                ? 'text-green-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {booking.status}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 